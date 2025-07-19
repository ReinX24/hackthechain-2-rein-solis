# SUI Devsync Pangasinan

## Windows Installation

Download exe file from github repo

https://github.com/Mystenlabs/suiup/releases

Extract the suiup.exe file int the following folder

C:\tools\suiup

Run the command to make sure sui is installed

sui --version

If sui is installed, continue at this part

https://move-book.com/before-we-begin/install-move-registry-cli/

#### Creating a new sui app

sui move new hello_world

#### Running hello_world and test

sui move build

sui move build --path hello_world

sui move test

#### Creating a todo app using sui

sui move new todo_list

sui move build

#### Running sui in local network

sui client

sui client active-address

sui client switch --env localnet

RUST_LOG="off,sui_node=info" sui start --with-faucet --force-regenesis

sui genesis --force

RUST_LOG="off,sui_node=info" sui start --with-faucet

sui client faucet

sui client balance

sui client objects

#### Publishing sui package

sui client publish

sui client publish --gas-budget 100000000

To redo publish command, delete Move.lock and build folder

#### Published objects id

0xa21b462e916f0ad94881e850b65856ed8d6c5da44d39106849661e24c4909ca5

export PACKAGE_ID=0xa21b462e916f0ad94881e850b65856ed8d6c5da44d39106849661e24c4909ca5

export MY_ADDRESS=$(sui client active-address)

#### Building a transaction

sui client ptb \
--gas-budget 100000000 \
--assign sender @$MY_ADDRESS \
--move-call $PACKAGE_ID::todo_list::new \
--assign list \
--transfer-objects "[list]" sender