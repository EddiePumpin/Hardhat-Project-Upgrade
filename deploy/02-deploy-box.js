const { hardhat } = require("hardhat")
const { developmentChains } = require("../helper-hardhat.config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const boxV2 = await deploy("Box", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations,
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...")
    await verify(boxV2.address, [])
  }
}
