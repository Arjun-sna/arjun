# Character set and Character encoding

Machines understand 0s and 1s. Character sets are created to convert characters between machine code and human-readable symbols. For example, the character **`a`** will be encoded based on the character set when it is stored in memory. And when the character is displayed, a decoder is used to convert the content in the memory into a human-readable symbol.

ASCII is one of the character set which represents a character in 7bit. Since it uses 7 bits, there can be 2^7, 128 characters represented in ASCII. ASCII contains only English alphabets

So with ASCII, character `a` will be stored in its binary representation of  `01100001` which is 97 in decimal which is the character code of `a` in ASCII.

Unicode was created to have a universal code for almost all characters across all languages in the world and some commonly used symbols. Unicode uses 1 to 6 bytes. To encode and decode Unicode characters, different techniques were used like UTF-8, UTF-16, UTF-32, etc.

- In UTF-8 each character is encoded into 1 to 4 bytes ( the dominant encoding )
- In UTF16 each character is encoded into 1 to two 16-bit words and
- in UTF-32 every character is encoded as a single 32-bit word.