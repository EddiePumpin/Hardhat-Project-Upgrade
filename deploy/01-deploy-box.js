const { hardhat } = require("hardhat")
const { developmentChains } = require("../helper-hardhat.config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("-------------")
  const box = await deploy("Box", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations,
    // This is the way of telling hardhat that it should deploy the Box contract behind a proxy
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        // Instead of having an admin address, for the proxy contract, we are going to have the proxy contract owned by an admin. This is the best practice
        name: "BoxProxyAdmin",
        artifact: "BoxProxyAdmin",
      },
    },
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...")
    await verify(box.address, [])
  }
}

module.exports.tags = ["all", "box"]
