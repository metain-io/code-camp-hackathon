use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{CloseAccount, Mint, Token, TokenAccount, Transfer}};

declare_id!("AbHafG3NvBumgzKZnKFZnvTcmM2zVFQfBmn4kHbWYn3d");

#[program]
pub mod offering {
    use super::*;

    pub fn set_treasury(ctx: Context<SetTreasury>, application_idx: u64) -> Result<()> {
        let appState = &mut ctx.accounts.application_state;
        appState.treasury = ctx.accounts.treasury.key().clone();
        Ok(())
    }

    // pub fn buy(ctx: Context<Buy>, currency: String, amount: u32) -> Result<()> {
    //     msg!("Buy {} NFTs with {}", amount, currency);

    //     // // Transfer amount of currency to treasurer
    //     // let transfer_instruction = Transfer{
    //     //     from: escrow_wallet.to_account_info(),
    //     //     to: destination_wallet,
    //     //     authority: state.to_account_info(),
    //     // };
    //     // let cpi_ctx = CpiContext::new_with_signer(
    //     //     token_program.to_account_info(),
    //     //     transfer_instruction,
    //     //     outer.as_slice(),
    //     // );
    //     // anchor_spl::token::transfer(cpi_ctx, amount)?;

    //     Ok(())
    // }
}

#[account]
#[derive(Default)]
pub struct State {
    pub treasury: Pubkey
}

#[derive(Accounts)]
#[instruction(application_idx: u64)]
pub struct SetTreasury<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    /// CHECK: Treasury account is setup one-time only
    pub treasury: AccountInfo<'info>,

    // Derived PDAs
    #[account(
        init,
        payer = signer,
        space = 8 + 32,
        seeds = [b"state".as_ref(), signer.key().as_ref(), application_idx.to_le_bytes().as_ref()],
        bump
    )]
    application_state: Account<'info, State>,

    pub system_program: Program<'info, System>
}

// #[derive(Accounts)]
// #[instruction(application_idx: u64, state_bump: u8, wallet_bump: u8)]
// pub struct InitializeNewGrant<'info> {

//     // Derived PDAs
//     #[account(
//         init,
//         payer = user_sending,
//         seeds=[b"state".as_ref(), user_sending.key().as_ref(), user_receiving.key.as_ref(), mint_of_token_being_sent.key().as_ref(), application_idx.to_le_bytes().as_ref()],
//         bump = state_bump,
//     )]
//     application_state: Account<'info, State>,
//     #[account(
//         init,
//         payer = user_sending,
//         seeds=[b"wallet".as_ref(), user_sending.key().as_ref(), user_receiving.key.as_ref(), mint_of_token_being_sent.key().as_ref(), application_idx.to_le_bytes().as_ref()],
//         bump = wallet_bump,
//         token::mint=mint_of_token_being_sent,
//         token::authority=application_state,
//     )]
//     escrow_wallet_state: Account<'info, TokenAccount>,

//     // Users and accounts in the system
//     #[account(mut)]
//     user_sending: Signer<'info>,                     // Alice
//     user_receiving: AccountInfo<'info>,              // Bob
//     mint_of_token_being_sent: Account<'info, Mint>,  // USDC

//     // Alice's USDC wallet that has already approved the escrow wallet
//     #[account(
//         mut,
//         constraint=wallet_to_withdraw_from.owner == user_sending.key(),
//         constraint=wallet_to_withdraw_from.mint == mint_of_token_being_sent.key()
//     )]
//     wallet_to_withdraw_from: Account<'info, TokenAccount>,

//     // Application level accounts
//     system_program: Program<'info, System>,
//     token_program: Program<'info, Token>,
//     rent: Sysvar<'info, Rent>,
// }