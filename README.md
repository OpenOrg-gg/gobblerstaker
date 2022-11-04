# gobblerstaker

This is the first draft of the contract. It compiles but I've not even written unit tests yet.

Premise is:

- User deposits Gobbler in `gooTogether.sol`

- Based on Gobbler's mulitplier they are given X amount of 'gooPoint' fragments.

- The fragments are an implementation of `uFragments.sol` which tracks `fragments` and `gons` (an internal value per fragment)

- In this case we map the total Goo held by the staking contract to be the value of `gons` so that `gons per fragment` rebases based on Goo gains.

- Users can withdraw their Gobbler at any time, burning their fragments and getting their share of Goo.

- Every deposit/withdraw action calls the function to update the amount of `goo` and rebase the fragments value.