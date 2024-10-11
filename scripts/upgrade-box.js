// Manual way to upgrade
const { ethers } = require("hardhat")

async function manin() {
  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
  const transparentProxy = await ethers.getContract("Box_Proxy") // The actual proxy. Implementation_proxy

  const proxyBoxV1 = await ethers.getContractAt(
    "BoxV",
    transparentProxy.address
  )
  const versionV1 = await proxyBoxV1.version()
  console.log(versionV1)

  const boxV2 = await ethers.getContarct("BoxV2")
  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  ) // We call the upgrade function on the boxProxyAdmin which calls it on our transparent proxy which will change the implementation from box one to box two
  await upgradeTx.wait(1)

  // To work with the functions on our boxV2
  const proxyBoxV2 = await ethers.getContractAt(
    "BoxV2",
    transparentProxy.address
  ) // IDU
  const versionV2 = await proxyBoxV2.version()
  console.log(versionV2)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
