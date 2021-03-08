'use strict'

const msg = prompt('Paste the content of your message here:')
const target = {}

// To check how RegEx work paste them into https://regex101.com/

const matchRegex = (regex, msg) => regex.test(msg) ? regex.exec(msg)[0] : null

// (?:...) non-capturing group
target['gdoTr'] = matchRegex(/^(?:\w\s){2}\d{6}\w\s\w{3}\s\d{2}/, msg)

target['address'] = {}

// (?<=...) positive lookbehind
target['address']['from'] = matchRegex(/(?<=FM\s).+/, msg)

// (?=...) positive lookahead
// *? lazy quantifier
target['address']['to'] = matchRegex(/(?<=TO\s).+(?:\n.+)*?(?=\nINFO)/, msg)

target['address']['info'] = matchRegex(/(?<=INFO\s).+(?:\n.+)*?(?=\nBT\n)/, msg)

target['sic'] = matchRegex(/(?<=SIC\s).+/, msg)

target['protocol'] = matchRegex(/(?<=SIC\s\w{3}\n).+/, msg)

target['operation'] = matchRegex(/(?<=OPER\/).+(?:.+\/)*(?=\/\/)/, msg)

target['msgId'] = {}

// [^...] a single character not present in the []
target['msgId']['mtfIdentifier'] = matchRegex(/(?<=MSGID\/)[^\/]+/, msg)

target['msgId']['originator'] = matchRegex(/(?<=MSGID\/[^\/]+\/)[^\/]+/, msg)

target['msgId']['serialNr'] = matchRegex(/(?<=MSGID\/[^\/]+\/[^\/]+\/)[^\/]+/, msg)

// TODO: scomporre ulteriormente ref
target['ref'] = matchRegex(/(?<=REF\/).+(?:\n.+)*?(?=\nLIMOP)/, msg)

target['limOp'] = matchRegex(/(?<=LIMOP\/)[^\/]+/, msg)

target['servizio'] = matchRegex(/(?<=SERV\/)[^\/]+/, msg)

console.log(target)

const outcome = `GDO trasmissione:\n${target['gdoTr']}\n
From:\n${target['address']['from']}\n
To:\n${target['address']['to']}\n
Info:\n${target['address']['info']}\n
Sic:\n${target['sic']}\n
Protocol Nr:\n${target['protocol']}\n
Operation:\n${target['operation']}\n
MTF Identifier:\n${target['msgId']['mtfIdentifier']}\n
Originator:\n${target['msgId']['originator']}\n
Message serial number:\n${target['msgId']['serialNr']}\n
Ref:\n${target['ref']}\n
Limop:\n${target['limOp']}\n
Servizio:\n${target['servizio']}\n
The End.`

console.log(outcome)