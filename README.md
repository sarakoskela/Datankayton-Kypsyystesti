# Projekti: Kyberturvan datankäytön kypsyystesti

Tänne selostetaan miten projekti toimii, jos toimii

# Asennettavat kirjastot/paketit
Node.js: npm install -g npm
Google Generative AI: npm install @google/generative-ai

# Projektin ajaminen
Projekti ajetaan pakallisesti Live Serverillä Visual Studio Codessa

# Gemini

Geminin implementointi ei onnistunut. Kaikki ohjeet joita yritin seurata ehdottivat require moduulia tai ES moduulia. Require moduuli ei toiminut ja antaa virheen "Uncaught ReferenceError: require is not defined" ja ilmeisesti selain ei tunnista scriptiä moduuliksi vaikka sen muuttaisi quick fixillä ES moduuliksi, joten se ilmoittaa että "Uncaught SyntaxError: import declarations may only appear at top level of a module" kun yrität importata geminiä @google/generative-ai kirjastosta. 

Kysyin neuvoa myös ChatGPT:ltä. Ensin se antoi samoja ohjeita kuin yllä, mutta sitten se ehdotti että luotaisiin bundle, jotta selain osaisi ymmärtää scriptin moduuliksi. Yritin Vite bundleria, mutta en osannut tehdä sitä oikein, joten se ei toimi. Sen sijaan tein vastauksille arvo systeemin, joka laskee pisteitä ja antaa niiden perusteella default vastaukset.
