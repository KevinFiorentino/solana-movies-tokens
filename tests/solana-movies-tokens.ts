import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token"
import { SolanaMoviesTokens } from "../target/types/solana_movies_tokens";
import { findMetadataPda } from "@metaplex-foundation/js"
import { expect } from "chai";

describe("Solana Movies Tokens", () => {

  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.SolanaMoviesTokens as Program<SolanaMoviesTokens>

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  )

  const nft = {
    uri: "https://arweave.net/OwXDf7SM6nCVY2cvQ4svNjtV7WBTz3plbI4obN9JNkk",
    name: "Movies and Tokens",
    symbol: "SMT",
  }

  const [mintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint")],
    program.programId
  )

  /* const tokenAccount = getAssociatedTokenAddressSync(
    mintPDA,
    provider.wallet.publicKey
  ) */

  it("Initialize Token Mint", async () => {

    const metadataPDA = await findMetadataPda(mintPDA)

    await program.methods
      .initializeTokenMint(nft.uri, nft.name, nft.symbol)
      .accounts({
        mint: mintPDA,
        metadata: metadataPDA,
        // tokenAccount: tokenAccount,
        user: provider.wallet.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      })
      .rpc()

    /* const account = await getAccount(provider.connection, tokenAccount)
    console.log(account) */
  })

});
