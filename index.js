// Binary representations of hex values
const hexToBinary = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  a: "1010",
  b: "1011",
  c: "1100",
  d: "1101",
  e: "1110",
  f: "1111",
};

// Wallet address
const walletAddress =
  "0x6452e909e7D092AFe2F0eA5BB0f5254D7efbcd57".toLowerCase();
//Display the wallet address
document.getElementById(
  "binary-equations"
).innerHTML = `<p>The wallet address is ${walletAddress}</p>`;

// Convert wallet address to binary
let binaryAddress = "";
for (let i = 2; i < walletAddress.length; i++) {
  binaryAddress += hexToBinary[walletAddress[i]];
}

// Display the binary representation of the wallet address
document.getElementById("wallet-binary").innerHTML = `
    <p><strong>Binary representation of the wallet address:</strong></p>
    <p>${binaryAddress.match(/.{1,40}/g).join("<br>")}</p>
`;

// Total number of possibilities and prime number
const totalPossibilities = BigInt(2 ** 160);
const prime = totalPossibilities + 7n;

document.getElementById("prime-calculation").innerHTML = `
    <p><strong>Total number of possibilities:</strong> 2^160 = ${totalPossibilities}</p>
    <p><strong>Prime number just greater than 2^160:</strong> ${prime}</p>
`;

// Generator of the cyclic group
const g = 2n;
document.getElementById(
  "generator"
).innerHTML = `A generator of the cyclic group generated by the above prime number is ${g}`;

// Convert binary representation to group element
let w = BigInt(0);
for (let i = 0; i < binaryAddress.length; i++) {
  if (binaryAddress[i] === "1") {
    w += BigInt(2 ** (binaryAddress.length - 1 - i));
  }
}

const x = (g * w) % prime;

document.getElementById("group-calculation").innerHTML = `
    <p><strong>Group element calculation:</strong></p>
    <p>w = ${w}</p>
    <p>x = g*w (mod p) = 2*w (mod ${prime}) = ${x}</p>
`;

// Protocol steps
const r = 3n;
const a = (r * g) % prime;

const c = 5n; // Randomly chosen for the protocol, can be a hash value in practice

const z = (c * w + r) % prime;

document.getElementById("protocol-steps").innerHTML = `
    <p><strong>Protocol Steps:</strong></p>
    <p>Prover chooses random r = ${r}</p>
    <p>Prover computes a = r * g (mod p) = ${a}</p>
    <p>Prover chooses random c = ${c}</p>
    <p>Prover computes z = c * w + r (mod p) = ${z}</p>
    <p>Prover sends a, c, z to Verifier</p>
    <p>Verifier checks if z * g (mod p) = c * x + a (mod p)</p>
`;

const lhs = (z * g) % prime;
const rhs = (c * x + a) % prime;

const verification = lhs === rhs;

document.getElementById("protocol-steps").innerHTML += `
    <p><strong>Verification:</strong></p>
    <p>Left Hand Side: z * g (mod p) = ${lhs}</p>
    <p>Right Hand Side: c * x + a (mod p) = ${rhs}</p>
    <p>Verification Result: ${verification ? "Success" : "Failure"}</p>
`;

// MathJax typeset
MathJax.typeset();
