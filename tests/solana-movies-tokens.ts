import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaMoviesTokens } from "../target/types/solana_movies_tokens";
import { Metaplex } from '@metaplex-foundation/js';

describe("Solana Movies Tokens", () => {

  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.SolanaMoviesTokens as Program<SolanaMoviesTokens>

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  )

  const uri = 'https://arweave.net/OwXDf7SM6nCVY2cvQ4svNjtV7WBTz3plbI4obN9JNkk';
  const name = 'Movies and Tokens';
  const symbol = 'SMT';
  const decimals = 6;

  const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint")],
    program.programId
  )

  // Only works in Devnet and the first time with the same Program ID
  it("Initialize Token Mint", async () => {

    const metaplex = Metaplex.make(provider.connection);

    const metadataPDA = metaplex.nfts().pdas().metadata({ mint: mintPDA });

    await program.methods
      .initializeTokenMint(uri, name, symbol, decimals)
      .accounts({
        mint: mintPDA,
        metadata: metadataPDA,
        user: provider.wallet.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      })
      .rpc()
  })

});
