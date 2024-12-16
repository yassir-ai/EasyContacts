const ObjectMapper = require('object-mapper');

// Définition des règles de mapping
const mappingRules = {
    'uuid': 'uuid',
    'name': 'name',
    'about': 'about',
    'type': 'type'
};

function mapContactToDTO(contact) {
    return ObjectMapper(contact, mappingRules);
}

module.exports = mapContactToDTO;