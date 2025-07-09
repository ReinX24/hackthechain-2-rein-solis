## Hack The Chain 2 Notes

#### Hardhat

[Notion Notes](https://www.notion.so/22924faacdda80e98d82da269f3bd4d0?v=22924faacdda80f2b599000c065f9b3c)

npm install --save-dev @nomicfoundation/hardhat-ethers ethers @nomicfoundation/hardhat-chai-matchers chai dotenv

npm install --save-dev @nomicfoundation/hardhat-toolbox

npx hardhat console --network victionTestnet

#### Questions that should be answered by your presentation:

#### Informal Worker Platform

1. What is/are the problem(s) you are trying to solve?
2. How will you integrate blockchain in your project? is blockchain really needed?
3. Are there any other existing applications that are similar to yours? how is your project different from them?

Include statistics, references, legal basis, etc to help support your statements

- Informal Worker Identity and Experience Tracker (Street Vendors, Tricycle Drivers, Domestic Helpers)

1. Lack of permanent information / record system for these workers.
2. By using the blockchain to store their information, blockchain is needed because it stores immutable data regarding the workers, which could be used for future references.
3. None have appeared in search engines.

AI Refined Answer

1. What is/are the problem(s) you are trying to solve?
   The project aims to address the significant challenges faced by informal workers in the Philippines due to the lack of formal identification and verifiable credentials. These problems include:

Lack of Formal Recognition and Data: Informal workers, such as street vendors, tricycle drivers, domestic helpers, and construction workers, often operate outside formal employment structures. This means they typically lack official employment records, verifiable work history, and recognized skill certifications. The Philippine Statistics Authority (PSA) acknowledges the challenge in collecting comprehensive data on informal employment, though estimates suggest it accounts for a substantial portion of the workforce (PSA, 2024).

Limited Access to Financial Services: Without formal proof of income, stable employment records, or verifiable identity, informal workers struggle to access basic financial services like bank accounts, loans, and insurance. This perpetuates a cycle of poverty and vulnerability, as they cannot build credit or secure capital for livelihood improvement.

Barriers to Social Protection: Access to social security (SSS), health insurance (PhilHealth), and other government benefits is often contingent on formal employment or a complex registration process that informal workers find difficult to navigate. This leaves them highly vulnerable to economic shocks, illness, and old age without a safety net (World Bank, 2019).

Difficulty in Proving Skills and Experience: While many informal workers possess valuable skills, they often lack formal certifications or a credible way to demonstrate their expertise to potential clients or employers. This can lead to underemployment, lower wages, and limited opportunities for career advancement.

Vulnerability to Exploitation: The lack of formal recognition and verifiable credentials can make informal workers more susceptible to exploitation, unfair labor practices, and harassment, as they have limited recourse or protection under existing legal frameworks (WIEGO, 2025).

Inefficient Aid Distribution: In times of crisis (e.g., natural disasters, pandemics), the absence of a reliable and accessible database of informal workers makes it challenging for government agencies and NGOs to efficiently identify and deliver aid to those most in need.

2. How will you integrate blockchain in your project? Is blockchain really needed?
   Blockchain technology is not just beneficial but crucially needed for this project due to its inherent properties of immutability, transparency, security, and user control, which directly address the limitations of traditional centralized systems.

Blockchain Integration:

Self-Sovereign Identity (SSI) Lite on Blockchain: Each informal worker will create a unique, pseudonymous on-chain identity (a Decentralized Identifier or DID) linked to their cryptocurrency wallet address. This identity is controlled solely by the individual, not a central authority.

Verifiable Credentials as NFTs (ERC-721) or Attestations:

Issuers: Trusted entities such as local barangay offices, NGOs, vocational training centers, or even past clients/employers (if a reputation system is implemented) can act as "issuers."

Issuance: These issuers will issue "verifiable credentials" (VCs) directly to the worker's blockchain identity. Examples of VCs include:

"Verified Resident of [Barangay Name]"

"Completed [Type of] Vocational Training"

"Positive Feedback for [Service Provided] from [Client]"

"Registered Tricycle Driver with [Local Association]"

Storage: These VCs can be represented as non-fungible tokens (NFTs, specifically ERC-721 tokens) or simple attestations stored on a Solidity smart contract. The NFT approach provides a clear, unique, and transferable digital asset representing the credential.

User Control: The worker (the "holder") stores these VCs in a digital wallet and has complete control over who can view or verify them. They can selectively present specific credentials without revealing all their personal data.

Reputation System: A simple smart contract can track positive attestations or successful task completions, building a basic on-chain reputation score for workers. This score, tied to their DID, can serve as a trust indicator for potential clients or employers.

Immutable and Transparent Records: All issued credentials and reputation updates are recorded on the blockchain, making them tamper-proof and publicly verifiable (though the content of the credential itself can be private, only its issuance and validity are on-chain).

Why Blockchain is Needed:

Immutability and Trustlessness: Unlike centralized databases that can be altered or deleted, blockchain records are immutable. This ensures that credentials, once issued, cannot be faked, revoked without a transparent process, or lost due to system failures or corruption. This builds trust in a system where formal records are often lacking or unreliable.

User Ownership and Control (Self-Sovereign Identity): Traditional identity systems are controlled by governments or corporations. Blockchain-based SSI gives individuals full control over their data and credentials. They decide what information to share, with whom, and when, aligning with data privacy principles. This is crucial for marginalized individuals who may be wary of centralized authorities.

Reduced Intermediaries and Costs: By allowing direct issuance and verification of credentials, blockchain can reduce the need for costly and time-consuming bureaucratic processes, making the system more accessible and efficient for informal workers.

Global Verifiability (Scalable Trust): While focused on the Philippines, a blockchain-based identity system can be globally verifiable, meaning a credential issued in one barangay could be recognized and trusted elsewhere, facilitating mobility and broader opportunities if the system gains adoption.

Enhanced Data Security and Privacy: Personal Identifiable Information (PII) is not stored directly on the public blockchain. Instead, cryptographic hashes or references are stored, while the actual verifiable credentials reside in the user's secure digital wallet. This design significantly reduces the risk of large-scale data breaches common in centralized systems (Dock Labs, 2025).

3. Are there any other existing applications that are similar to yours? How is your project different from them?
   While no direct, widely adopted application specifically for decentralized identity and credentialing for informal workers in the Philippines exists, similar concepts and technologies are being explored globally:

Similar Existing Applications (General):

Philippine National ID System (PhilSys): The Philippine Identification System aims to provide a unified national ID for all Filipinos, improving access to government and private services.

Similarity: It seeks to provide a foundational identity for citizens.

Difference: PhilSys is a centralized government initiative. Our project is decentralized and user-controlled. PhilSys focuses on basic identification; our project focuses on verifiable credentials for skills and work experience, specifically for the informal sector, which PhilSys might not fully capture in terms of detailed work history or informal skill validation. While PhilSys improves service delivery, it doesn't inherently solve the trust and immutability issues that blockchain addresses for informal work records. The government is also launching digital ID systems, such as the digital PWD ID system, which are still centralized (Mobile ID World, 2025).

Traditional Job Platforms (e.g., JobStreet, LinkedIn): These platforms allow users to create profiles and list work experience and skills.

Similarity: They aim to connect workers with opportunities and showcase credentials.

Difference: These are centralized, proprietary platforms. They control user data, and the veracity of listed skills and experiences relies on the platform's verification mechanisms or self-reporting. Our project offers immutable, cryptographically verifiable credentials issued by trusted third parties, giving the worker ownership and control over their data, and reducing reliance on a single platform's reputation.

Government Livelihood Programs (e.g., DOLE Integrated Livelihood Program - DILP, TUPAD): The Department of Labor and Employment (DOLE) has various programs to support informal workers, including livelihood assistance and temporary employment (PIA, 2025; Yale SOM, 2020).

Similarity: They aim to uplift informal workers.

Difference: These are aid and employment programs, not identity or credentialing systems. Our project could complement these by providing a verifiable identity and skill record that could make informal workers more easily identifiable for such programs and help track their progress.

Global Blockchain Identity Projects: Projects like uPort, Sovrin, and Dock are building decentralized identity frameworks.

Similarity: They utilize blockchain for self-sovereign identity and verifiable credentials.

Difference: These are foundational technologies or global frameworks. Our project is a specific application of these principles tailored to the unique context and needs of informal workers in the Philippines, focusing on practical credentials relevant to their livelihoods (e.g., tricycle driver registration, domestic helper experience, street vendor permits).

How this Project is Different (Value Proposition):

Our "Informal Worker Identity and Experience Tracker" project uniquely combines the power of blockchain-based self-sovereign identity and verifiable credentials with a direct focus on the specific challenges faced by marginalized informal workers in the Philippines.

Hyper-local Relevance: It's designed to integrate with local community structures (barangays, local associations) as potential issuers of credentials, making it practical and accessible.

Empowerment through Ownership: It shifts data ownership and control from institutions to the individual worker, fostering trust and privacy.

Economic Inclusion Focus: By providing verifiable proof of identity, skills, and work history, it directly aims to unlock access to formal financial services, better employment opportunities, and social protection for a highly vulnerable demographic.

Transparency and Immutability for Informal Sector: It brings the benefits of immutable, transparent record-keeping to a sector notoriously lacking in formal documentation, reducing fraud and increasing accountability.

Statistics, References, and Legal Basis:
Statistics:

Size of Informal Economy: The informal economy is a significant part of the Philippine economy, estimated to account for more than 80% of total employment and about one-third of the country's GDP (PSA, 2024; World Bank, 2019).

Number of Informal Workers: In 2019, it was estimated that more than 83% of Filipino workers were informally employed (Cabegin, 2018, cited in PSSC Policy Brief). In January 2023, an estimated 20 million or 42.2% of the total number of Filipino workers belonged to the informal sector. If irregular workers in private establishments are included, the number can reach 34.5 million or 73% of total employees (PRWC, 2023).

Vulnerability: Informal workers are highly vulnerable to economic shocks (e.g., COVID-19 pandemic), experiencing significant job and income reductions (PSSC Policy Brief, 2023). They often face poor and unsafe working conditions, low productivity and wages, limited access to credit and training, and lack of legal and social protection (PSA, 2024).

Informality by Sector: High informality rates (90% or more) are found in agriculture, domestic service, construction, and transport and storage (PSSC Policy Brief, 2023).

References:

Philippine Statistics Authority (PSA). (2024). Addressing the deficiency in informal employment statistics in the PHL. Retrieved from https://psa.gov.ph/sites/default/files/ncs/paper-presentations-manuscripts/Addressing%20the%20deficiency%20in%20informal%20employment%20statistics%20in%20the%20PHL_Cabegin_0.pdf

Philippine Social Science Council (PSSC). (2023). POLICY BRIEF - Philippine Social Science Council. Retrieved from https://pssc.org.ph/wp-content/uploads/2023/10/UP-CIDS-POLICY-BRIEF-2022%E2%80%9301.pdf

PRWC. (2023, April 21). Jobs crisis: Rise in the number of informal work. Retrieved from https://philippinerevolution.nu/2023/04/21/jobs-crisis-rise-in-the-number-of-informal-work/

World Bank. (2019). The Philippines: Addressing Informality. (While the direct link to the 2019 report wasn't found in the search, the PSA document references it, indicating the World Bank's focus on informality in the Philippines).

WIEGO (Women in Informal Employment: Globalizing and Organizing). (2025). Challenges of Organizing Informal Workers. Retrieved from https://www.wiego.org/informal-economy/articles/challenges-organizing-informal-workers/

Dock Labs. (2025, June 27). Blockchain Identity Management: Beginner's Guide 2025. Retrieved from https://www.dock.io/post/blockchain-identity-management

Mobile ID World. (2025, June 26). Philippines to Launch Digital PWD ID System Across 35 Regions in July 2025. Retrieved from https://mobileidworld.com/philippines-to-launch-digital-pwd-id-system-across-35-regions-in-july-2025/

Philippine Information Agency (PIA). (2025, May 21). DOLE brings vital training to informal workers. Retrieved from https://pia.gov.ph/dole-brings-vital-training-to-informal-workers/

Yale School of Management. (2020, May 13). The Philippines Provides Support to Workers in the Informal Economy. Retrieved from https://som.yale.edu/blog/the-philippines-provides-support-to-workers-in-the-informal-economy

Legal Basis/Alignment:

While there isn't a specific Philippine law directly governing blockchain-based self-sovereign identity for informal workers yet, the project aligns with existing legal frameworks and national goals:

Republic Act No. 10173, or the Data Privacy Act of 2012 (DPA): This law protects the privacy of individuals while ensuring the free flow of information. Our project's emphasis on user control over personal data, selective disclosure, and not storing PII directly on a public blockchain aligns strongly with the DPA's principles of transparency, legitimate purpose, and proportionality. The DPA gives data subjects rights such as the right to be informed, object, access, rectify, and erase their data (SecurePrivacy.ai, 2024). The decentralized nature of SSI inherently gives individuals more control over their data, which is a core tenet of the DPA.

Philippine Identification System Act (Republic Act No. 11055): This law establishes the national ID system. While our project is decentralized, it complements the broader goal of providing a foundational identity for all Filipinos to access services. Our project can be seen as an extension that provides verifiable attributes beyond basic identity.

Department of Labor and Employment (DOLE) Mandate: DOLE's mandate includes promoting decent work and protecting the welfare of all workers, including those in the informal sector. Our project supports this by aiming to formalize aspects of informal work, improve access to opportunities, and enhance social protection.

National Anti-Poverty Commission (NAPC) - Workers in the Informal Sector (WIS) Sectoral Council: NAPC's focus on addressing the challenges faced by WIS, including social protection and workplace security, resonates with the project's objectives (NAPC, 2025). Local government initiatives, like those in Quezon City, to protect informal workers also show a growing recognition of their needs.

Digital Transformation Agenda: The Philippine government, with support from entities like the World Bank, is actively pursuing digital transformation to drive productivity and enhance efficiency of services, including financial inclusion and social protection (World Bank, 2025). Our project contributes to this digital transformation by leveraging emerging technologies for social good.

#### Immutable Academic Records and Certificates 

Store diplomas, certificates, and transcripts on chain as soulbound tokens tamper proof instantly verifiable and permanent credentials for students and workers