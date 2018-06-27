module.exports = {
    '/': {
        backLink: '../uploadphoto/check-photo-and-submit',
        fields: [
            'passport-number',
            // 'expiry-day',
            // 'expiry-month',
            // 'expiry-year'
        ],
        next: '/name'
    },
    '/title': {
        backLink: './',
        fields: [
            'title'
        ],
        next: '/name'
    },
    '/name': {
        backLink: '../renew',
        fields: [
            'title',
            'name',
            'lastname',
            'change-name'
        ],
        next: '/gender',
        forks: [{
            target: '/change-of-name',
            condition: {
                field: 'change-name',
                value: true
            }
        }]
    },
    '/change-of-name': {
        backLink: 'name',
        fields: [
            'change-of-name-reason'
        ],
        next: '/previous-names'
    },
    '/previous-names': {
        fields: [
            'previous-name',
            'previous-first-name',
            'previous-last-name'
        ],
        backLink: 'name',
        next: '/gender'
    },
    '/gender': {
        fields: [
            'gender'
        ],
        next: '/place-of-birth'
    },
    '/place-of-birth': {
        next: '/naturalisation-registration-details',
        // next: '/parents',
        fields: [
            'born-in-uk',
            'town-of-birth',
            'country-of-birth'
        ],
        forks: [{ // If they do NOT have a certificate
            target: '/family-intro',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['naturalisation-registration-certificate'] == false;
            }
        }],
        controller: require('../../../controllers/go-overseas'),
        nextAlt: './home-address-overseas'
    },
    '/naturalisation-registration-details': {
        next: '/home-address',
        fields: [
            'naturalisation-registration-certificate-number',
            'naturalisation-registration-certificate-issue-day',
            'naturalisation-registration-certificate-issue-month',
            'naturalisation-registration-certificate-issue-year'
        ]
    },
    '/family-intro': {
        next: '/parents'
    },
    '/parents': {
        controller: require('../../../controllers/validation-parents'),
        fields: [
            'parent1-first-names',
            'parent1-last-name',
            'parent1-age-day',
            'parent1-age-month',
            'parent1-age-year',
            'parent1-additional-information',

            'parent2-first-names',
            'parent2-last-name',
            'parent2-age-day',
            'parent2-age-month',
            'parent2-age-year',
            'parent2-additional-information',

            'parents-married',
            'marriage-day',
            'marriage-month',
            'marriage-year'
        ],
        next: '/parent-1-details'
    },
    // '/parents-married': {
    //     fields: ['parents-married'],
    //     backLink: '/parents',
    //     next: '/parent-1-details'
    //   },
    '/parent-1-details': {
        fields: [
            'parent1-town-of-birth',
            'parent1-country-of-birth',
            'parent1-uk-passport',
            'parent1-country-of-nationality',
            'parent1-passport-number',
            'parent1-passport-issue-day',
            'parent1-passport-issue-month',
            'parent1-passport-issue-year'
        ],
        // controller: require('../../../controllers/parents-details'),
        // forks: [{
        //     target: '/home-address', // If parent 2 has NOT been filled in
        //     condition: function(req, res) {
        //       return req.session['hmpo-wizard-common']['parent2-first-names'] == "";
        //     }
        //   }],
        next: '/parent-2-details'
    },
    '/parent-2-details': {
        fields: [
            'parent2-town-of-birth',
            'parent2-country-of-birth',
            'parent2-uk-passport',
            'parent2-country-of-nationality',
            'parent2-passport-number',
            'parent2-passport-issue-day',
            'parent2-passport-issue-month',
            'parent2-passport-issue-year'
        ],
        next: '/parent-1-grandparents',
        // controller: require('../../../controllers/go-overseas'),
        nextAlt: './home-address-overseas',
        forks: [{
            target: '/home-address',
            condition: function (req, res) { // If Born in UK AND Before 01/01/1983 OR Passport issued Before 01/01/1994 (Old blue) Hidden FTA
                return req.session['hmpo-wizard-common']['born-in-uk'] == true &&
                    req.session['hmpo-wizard-common']['born-before-1983'] == true ||
                    req.session['hmpo-wizard-common']['old-blue'] == true;
            }
        }, {
            target: '/home-address',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['application-for'] == false;
            }
        }]
    },
    '/parent-1-grandparents': {
        controller: require('../../../controllers/validation-parent-1-grandparents'),
        fields: [
            'parent1-parent1-first-names',
            'parent1-parent1-last-name',
            'parent1-parent1-town-of-birth',
            'parent1-parent1-country-of-birth',
            'parent1-parent1-age-day',
            'parent1-parent1-age-month',
            'parent1-parent1-age-year',
            'parent1-parent1-additional-information',

            'parent1-parent2-first-names',
            'parent1-parent2-last-name',
            'parent1-parent2-town-of-birth',
            'parent1-parent2-country-of-birth',
            'parent1-parent2-age-day',
            'parent1-parent2-age-month',
            'parent1-parent2-age-year',
            'parent1-parent2-additional-information',

            'parent1-parents-married',
            'parent1-parents-marriage-day',
            'parent1-parents-marriage-month',
            'parent1-parents-marriage-year'
        ],
        next: '/parent-2-grandparents'
    },
    '/parent-2-grandparents': {
        controller: require('../../../controllers/validation-parent-2-grandparents'),
        fields: [
            'parent2-parent1-first-names',
            'parent2-parent1-last-name',
            'parent2-parent1-town-of-birth',
            'parent2-parent1-country-of-birth',
            'parent2-parent1-age-day',
            'parent2-parent1-age-month',
            'parent2-parent1-age-year',
            'parent2-parent1-additional-information',

            'parent2-parent2-first-names',
            'parent2-parent2-last-name',
            'parent2-parent2-town-of-birth',
            'parent2-parent2-country-of-birth',
            'parent2-parent2-age-day',
            'parent2-parent2-age-month',
            'parent2-parent2-age-year',
            'parent2-parent2-additional-information',

            'parent2-parents-married',
            'parent2-parents-marriage-day',
            'parent2-parents-marriage-month',
            'parent2-parents-marriage-year'
        ],
        next: '/home-address'
    },
    // '/identity-interview': {
    //     fields: [
    //         'can-interview',
    //         'no-interview-reason'
    //     ],
    //     next: '/home-address'
    // },
    '/home-address': {
        fields: [
            'address1',
            'address2',
            'address3',
            'address4',
            'address5',
            'town',
            'postcode'
        ],
        next: '/contact-details'
    },
    '/home-address-overseas': {
        fields: [
            'address1',
            'address2',
            'address3',
            'address4',
            'address5',
            'town',
            'postcode'
        ],
        next: '/contact-details-overseas'
    },
    '/contact-details': {
        fields: ['email', 'mobile'],
        next: '/get-updates'
    },
    '/contact-details-overseas': {
        fields: [
            'email',
            'application-country-code',
            'mobile-overseas'
        ],
        next: '/get-updates-overseas'
    },
    '/get-updates-overseas': {
        next: '/passport-options-overseas'
    },
    '/get-updates': {
        next: '/passport-options'
    },
    '/dual-national': {
        backLink: './get-updates',
    },
    '/dual-national-details': {
        backLink: 'dual-national',
        next: '/title'
    },
    '/passport-options': {
        fields: [
            'passport-options',
            'braille'
        ],
        next: '/sign',
        backLink: './dual-national',
        forks: [{
            target: '/sign-third-party',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['application-for'] == false;
            }
        }],
    },
    '/passport-options-overseas': {
        fields: [
            'passport-options-overseas',
            'braille'
        ],
        next: '/sign'
    },
    '/sign': {
        fields: [
            'can-sign',
            'no-sign-reason'
        ],
        backLink: 'passport-options',
        next: '/passport-special-delivery',
        /* if they are from the UK */
        controller: require('../../../controllers/go-overseas'),
        nextAlt: './summary-overseas'
    },
    '/sign-third-party': {
        fields: [
            'can-sign-third-party',
            'no-sign-reason-third-party'
        ],
        backLink: 'passport-options',
        next: '/passport-special-delivery',
        /* if they are from the UK */
        controller: require('../../../controllers/go-overseas'),
        nextAlt: './summary-overseas'
    },
    '/summary-overseas': {
        controller: require('../../../controllers/confirm-overseas'),
        template: 'confirm',
        next: '/declaration'
    },
    '/passport-special-delivery': {
        // next: '/summary-family-details',
        next: '/summary',
        fields: ['secure-return']
    },
    // '/summary-family-details': {
    //     controller: require('../../../controllers/confirm-family-details'),
    //     template: 'confirm-family-details',
    //     next: '/summary'
    // },
    '/summary': {
        controller: require('../../../controllers/confirmFTA'),
        template: 'confirm',
        next: '/fta-docs'
    },
    '/required-documents': {
        controller: require('../../../controllers/change-of-name-docsFTA')
    },
    '/fta-docs': {
        next: '/required-documents'
    },
    '/thirdparty-fta-docs': {
        next: '/required-documents'
    },
    '/name-change-docs': {
        next: '/declaration'
    },
    '/name-change-docs-for-marriage': {
        next: '/declaration'
    },
    '/name-change-docs-for-divorce': {
        next: '/declaration'
    },
    '/name-change-docs-for-small-changes': {
        next: '/declaration'
    },
    '/name-change-docs-for-gender-change': {
        next: '/declaration'
    },
    '/name-change-docs-for-other-changes': {
        next: '/declaration'
    },
    '/name-change-docs-for-parents': {
        next: '/declaration'
    },
    '/declaration': {
        fields: ['declaration'],
        prereqs: [
            '/summary'
        ],
        next: '/payment'
    },
    '/payment': {
        controller: require('../../../controllers/dual-national'),
        next: '/processing-payment'
    },
    '/processing-payment': {
        next: '/confirmation'
    },
    '/confirmation': {
        next: '/title'
    }
};