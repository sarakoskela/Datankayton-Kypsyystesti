# Projekti: Kyberturvan datankäytön kypsyystesti

Tänne selostetaan miten projekti toimii, jos toimii

# Gemini

Geminin implementointi ei onnistunut. Kaikki ohjeet joita yritin seurata ehdottivat require moduulia tai ES moduulia. Require moduuli ei toiminut ja antaa virheen "Uncaught ReferenceError: require is not defined" ja ilmeisesti selain ei tunnista scriptiä moduuliksi, joten se ilmoittaa että "Uncaught SyntaxError: import declarations may only appear at top level of a module" kun yrität importata gemini moduulia @google/generative-ai kirjastosta. 

Kysyin neuvoa myös ChatGPT:ltä. Ensin se antoi samoja ohjeita kuin yllä, mutta sitten se ehdotti että luotaisiin bundle, jotta selain osaisi ymmärtää scriptin moduuliksi. Yritin Vite bundleria, mutta ei osattu tehdä sitä oikein.
