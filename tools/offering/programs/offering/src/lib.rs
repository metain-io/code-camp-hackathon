use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{CloseAccount, Mint, Token, TokenAccount, Transfer}};

declare_id!("AbHafG3NvBumgzKZnKFZnvTcmM2zVFQfBmn4kHbWYn3d");

fn transfer_escrow_out<'info>(
    user_sending: AccountInfo<'info>,
    user_receiving: AccountInfo<'info>,
    mint_of_token_being_paid: AccountInfo<'info>,
    mint_of_token_being_sent: AccountInfo<'info>,
    escrow_wallet: &mut Account<'info, TokenAccount>,
    application_idx: u64,
    state: AccountInfo<'info>,
    state_bump: u8,
    token_program: AccountInfo<'info>,
    destination_wallet: AccountInfo<'info>,
    amount: u64
) -> Result<()> {

    // Nothing interesting here! just boilerplate to compute our signer seeds for
    // signing on behalf of our PDA.
    let bump_vector = state_bump.to_le_bytes();
    let mint_of_token_being_paid_pk = mint_of_token_being_paid.key().clone();
    let mint_of_token_being_sent_pk = mint_of_token_being_sent.key().clone();
    let application_idx_bytes = application_idx.to_le_bytes();
    let inner = vec![
        b"state".as_ref(),
        user_sending.key.as_ref(),
        mint_of_token_being_paid_pk.as_ref(),
        mint_of_token_being_sent_pk.as_ref(),
        application_idx_bytes.as_ref(),
        bump_vector.as_ref(),
    ];
    let outer = vec![inner.as_slice()];

    // Perform the actual transfer
    let transfer_instruction = Transfer{
        from: escrow_wallet.to_account_info(),
        to: destination_wallet,
        authority: state.to_account_info(),
    };
    let cpi_ctx = CpiContext::new_with_signer(
        token_program.to_account_info(),
        transfer_instruction,
        outer.as_slice(),
    );
    anchor_spl::token::transfer(cpi_ctx, amount)?;

    Ok(())
}

#[program]
pub mod offering {
    use super::*;

    pub fn deposit_nft(ctx: Context<DepositNft>, application_idx: u64, state_bump: u8, amount: u64, pay_symbol: String) -> Result<()> {
        // Set the state attributes
        let state = &mut ctx.accounts.application_state;
        state.idx = application_idx;

        let bump_vector = state_bump.to_le_bytes();
        let mint_of_token_being_paid_pk = ctx.accounts.mint_of_token_being_paid.key().clone();
        let mint_of_token_being_sent_pk = ctx.accounts.mint_of_token_being_sent.key().clone();
        let application_idx_bytes = application_idx.to_le_bytes();
        let inner = vec![
            b"state".as_ref(),
            ctx.accounts.treasurer.key.as_ref(),
            mint_of_token_being_paid_pk.as_ref(),
            mint_of_token_being_sent_pk.as_ref(),
            application_idx_bytes.as_ref(),
            bump_vector.as_ref(),
        ];
        let outer = vec![inner.as_slice()];

        let transfer_instruction = Transfer{
            from: ctx.accounts.wallet_to_withdraw_from.to_account_info(),
            to: ctx.accounts.escrow_wallet_state.to_account_info(),
            authority: ctx.accounts.treasurer.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction,
            outer.as_slice()
        );

        anchor_spl::token::transfer(cpi_ctx, amount)?;

        Ok(())
    }

    pub fn buy(ctx: Context<Buy>, application_idx: u64, state_bump: u8, wallet_bump: u8, amount: u64) -> Result<()> {
        let transfer_instruction = Transfer{
            from: ctx.accounts.wallet_to_withdraw_from.to_account_info(),
            to: ctx.accounts.wallet_to_deposit_to.to_account_info(),
            authority: ctx.accounts.buyer.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction
        );

        anchor_spl::token::transfer(cpi_ctx, amount * 10000000)?;

        transfer_escrow_out(
            ctx.accounts.treasurer.to_account_info(),
            ctx.accounts.buyer.to_account_info(),
            ctx.accounts.mint_of_token_being_paid.to_account_info(),
            ctx.accounts.mint_of_token_being_sent.to_account_info(),
            &mut ctx.accounts.escrow_wallet_state,
            application_idx,
            ctx.accounts.application_state.to_account_info(),
            state_bump,
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.wallet_to_send_to.to_account_info(),
            amount
        )?;

        Ok(())
    }
}

#[account]
#[derive(Default)]
pub struct State {
    // A primary key that allows us to derive other important accounts
    idx: u64
}

#[derive(Accounts)]
#[instruction(application_idx: u64, state_bump: u8, amount: u64)]
pub struct DepositNft<'info> {
    // Derived PDAs
    #[account(
        init,
        space = 8 + 8 + 32,
        payer = treasurer,
        seeds=[b"state".as_ref(), treasurer.key().as_ref(), mint_of_token_being_paid.key().as_ref(), mint_of_token_being_sent.key().as_ref(), application_idx.to_le_bytes().as_ref()],
        bump,
    )]
    application_state: Account<'info, State>,

    #[account(
        init,
        payer = treasurer,
        seeds=[b"wallet".as_ref(), treasurer.key().as_ref(), mint_of_token_being_paid.key().as_ref(), mint_of_token_being_sent.key().as_ref(), application_idx.to_le_bytes().as_ref()],
        bump,
        token::mint=mint_of_token_being_sent,
        token::authority=application_state,
    )]
    escrow_wallet_state: Account<'info, TokenAccount>,

    // Users and accounts in the system
    #[account(mut)]
    treasurer: Signer<'info>,
    mint_of_token_being_sent: Box<Account<'info, Mint>>,
    mint_of_token_being_paid: Box<Account<'info, Mint>>,

    // VOT wallet that has already approved the escrow wallet
    #[account(
        mut,
        constraint=wallet_to_withdraw_from.owner == treasurer.key(),
        constraint=wallet_to_withdraw_from.mint == mint_of_token_being_sent.key()
    )]
    wallet_to_withdraw_from: Account<'info, TokenAccount>,

    // Application level accounts
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
    rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(application_idx: u64, state_bump: u8, wallet_bump: u8, amount: u64)]
pub struct Buy<'info> {
    // Derived PDAs
    #[account(
        mut,
        seeds=[b"state".as_ref(), treasurer.key().as_ref(), mint_of_token_being_paid.key().as_ref(), mint_of_token_being_sent.key().as_ref(), application_idx.to_le_bytes().as_ref()],
        bump = state_bump
    )]
    application_state: Box<Account<'info, State>>,

    #[account(
        mut,
        seeds=[b"wallet".as_ref(), treasurer.key().as_ref(), mint_of_token_being_paid.key().as_ref(), mint_of_token_being_sent.key().as_ref(), application_idx.to_le_bytes().as_ref()],
        bump = wallet_bump,
        token::mint=mint_of_token_being_sent,
        token::authority=application_state,
    )]
    escrow_wallet_state: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint=wallet_to_withdraw_from.owner == buyer.key()
    )]
    wallet_to_withdraw_from: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint=wallet_to_deposit_to.owner == treasurer.key()
    )]
    wallet_to_deposit_to: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = mint_of_token_being_sent.key(),
        associated_token::authority = buyer.key(),
    )]
    wallet_to_send_to: Account<'info, TokenAccount>,

    #[account(mut)]
    buyer: Signer<'info>,
    mint_of_token_being_sent: Box<Account<'info, Mint>>,
    mint_of_token_being_paid: Box<Account<'info, Mint>>,

    /// CHECK: It is always safe to be beneficiary
    treasurer: AccountInfo<'info>,

    system_program: Program<'info, System>,
    token_program: Program<'info, Token>
}
