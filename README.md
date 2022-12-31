# Solana Movies and Tokens Program

Solana program to create movie reviews and earn tokens.

- [See online](https://sol-movie-reviews.vercel.app/)
- [See UI](https://github.com/KevinFiorentino/solana-movies-tokens-ui)

### Fund wallet

- `solana config set --url devnet`
- `solana airdrop 2` x2
- `solana balance`

### Deploy program

- `anchor build`
- `solana address -k target/deploy/solana_movies_tokens-keypair.json`
- Replace Program ID in `lib.rs` and `Anchor.toml`
- `anchor build` (again)
- `anchor deploy`

### Initialize Token Mint

- `anchor test --skip-build --skip-deploy` (only works the first time with the same Program ID)
