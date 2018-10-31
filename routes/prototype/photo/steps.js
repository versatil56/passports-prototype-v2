module.exports = {
    '/': {},
    '/digital-photo': {
        next: '/choose-photo-method'
    },
    '/choose-photo-method': {
        fields: ['choose-photo'],
        next: '/upload',
        forks: [{
            target: '/retrieve',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['choose-photo'] == 'code';
            }
        }]
    },
    '/upload': {
        next: '/processing-image',
        controller: require('../../../controllers/check-query-string'),
        forks: [{
            target: '/../photo/upload-errors',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['status'] == 'retry'
            }
        }]
    },
    '/processing-image': {
        // backLink: './upload',
    },
    '/questions-intro': {
        backLink: './upload'
    },
    '/final-checks': {
        fields: [
            'submit-photo'
        ],
        // backLink: './questions-intro',
        next: '/../apply',
        forks: [{
                target: '/choose-photo-method',
                condition: {
                    field: 'submit-photo',
                    value: false
                }
            }, {
                target: '/../apply',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['passport-before'] == true; // If they have had UK passport before
                }
            }, {
                target: '/../apply/name',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['passport-before'] == false; // If they have NOT had UK passport before
                }
            }
            // {
            //     target: '/../apply',
            //     condition: function (req, res) { // If they have had UK passport before AND NOT a Hidden FTA
            //         return req.session['hmpo-wizard-common']['passport-before'] == true
            //             && req.session['hmpo-wizard-common']['old-blue'] == false;
            //     }
            // }, {
            //     target: '/csig-required',
            //     condition: function (req, res) { // If they are an FTA OR Hidden FTA
            //         return req.session['hmpo-wizard-common']['passport-before'] == false
            //             || req.session['hmpo-wizard-common']['passport-before'] == true
            //             && req.session['hmpo-wizard-common']['old-blue'] == true;
            //     }
            // }
        ]
    },
    // '/csig-required': {
    //     next: '/../apply',
    //     forks: [{
    //         target: '/../apply',
    //         condition: function (req, res) {
    //             return req.session['hmpo-wizard-common']['passport-before'] == true; // If they are a Hidden FTA
    //         }
    //     }, {
    //         target: '/../apply/name',
    //         condition: function (req, res) {
    //             return req.session['hmpo-wizard-common']['passport-before'] == false; // If they are a FTA
    //         }
    //     }]
    // },
    '/retrieve': {
        fields: ['photo-code-path'],
        backLink: './choose-photo-method',
        next: '/retrieving-image'
    },
    '/retrieving-image': {
        // backLink: './retrieve',
    },
    '/fetch-result': {
        controller: require('../../../controllers/fetch-result')
    },
    '/check-and-submit-passed-photo': {
        backLink: './retrieve',
        next: '/../apply'
    },
    '/check-and-submit-photo': {
        fields: ['oix-override', 'oix-override-reason'],
        backLink: './retrieve',
        next: '/../apply',
        forks: [{
            target: '/choose-photo-method',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['oix-override'] == false;
            }
        }]
    },
    '/not-accepted': {
        backLink: './retrieve',
        next: '/choose-photo-method'
    },
    '/code-error': {
        backLink: './retrieve',
        next: '/retrieve'
    }
};
