# Introduction

# Setup VPS

1. Create VPS named `${ENV}-echidna-master`
2. Install Redis
3. Install NodeJS
4. Install PM2
5. Setup Firewall UFW

# Create AWS user

1. Create programmatic access user `${ENV}-echidna`
2. Inline the policy
3. Attach bus policies: critical, high, medium and low.
4. Install the credentials on VPS

# Troubleshootings

## Cannot connect to VPS with Node-SSH
1. Add this line to `/etc/ssh/sshd_config`: `PubkeyAcceptedKeyTypes=+ssh-rsa`
2. Restart sshd service: `systemctl restart sshd.service`
