# Azure Cosmos DB with React Native

## Summary

This repository continas samples on how to access **Azure Cosmos DB** service with React Native.

Azure Cosmos DB is a database for building blazing fast, planet scale applications with native support for NoSQL. It was built from the ground up with global distribution and horizontal scale at its core. It offers turnkey global distribution across any number of Azure regions by transparently scaling and replicating your data wherever your users are. Elastically scale your writes and reads all around the globe, and pay only for what you need. Azure Cosmos DB provides native support for NoSQL and OSS APIs including MongoDB, Cassandra, Gremlin and SQL, offers multiple well-defined consistency models, guarantees single-digit-millisecond read and write latencies at the 99th percentile, and guarantees 99.999 high availability with multi-homing anywhere in the world—all backed by industry-leading, comprehensive service level agreements (SLAs).

## Prerequisites

1. Azure account

You should have an Azure account with active subscription. If you don't have one, you can [start a free Azure trial](https://azure.microsoft.com/en-us/free/) here and get the access to the Azure services.

2. Cosmos DB service

Once you have you Azure account set, please [create a new Cosmos DB instance](https://azure.microsoft.com/en-us/free/cosmos-db) and copy access keys to be used in the sample.

## Run the sample

1. Update secrets

Open <TBD> and replace <TBD> with the Cosmos DB Access Key

2. Run the server

> yarn start

3. Run the iOS app

> react-native run-ios

Known issue #1: [unable to start simulator](https://github.com/facebook/react-native/issues/23282#issuecomment-476439080)

4. Run the Android app

> react-native run-android

## Useful links

1. Azure Free Trial
2. Azure Cosmos DB
3. React Native