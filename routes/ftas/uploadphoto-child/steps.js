module.exports = {
    '/': {
        next: '/processing'
    },
    '/processing': {},
    '/photo-uploaded-success': {
        backLink: './processing'
    },
    '/check-photo-and-submit': {
        fields: [
            'submit-photo'
        ],
        backLink: '/photo-uploaded-success',
        next: '../../renew',
        forks: [{
                target: '../../renew',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['passport-before'] == true; // If they have had UK passport before
                }
            }, {
                target: '../../../renew/name',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['passport-before'] == false; // If they have NOT had UK passport before
                }
            },
            {
                target: '/upload',
                condition: {
                    field: 'submit-photo',
                    value: 'No'
                }
            }
        ]
    },
    '/not-accepted': {
        backLink: './upload'
    },
    '/questions-intro': {
        backLink: './not-accepted'
    },
    '/override': {
        fields: [
            'photo-override',
            'override-reason'
        ],
        backLink: './questions-intro',
        next: '/final-checks-override',
        forks: [{
            target: '/',
            condition: {
                field: 'photo-override',
                value: false
            }
        }]
    },
    '/final-checks-override': {
        backLink: './override',
        next: '../../ftas/renew/name'
    }
};