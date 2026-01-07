export interface Step {
    title: { en: string; it: string }
    description?: { en: string; it: string }
    order: number
    layout?: 'with-image' | 'two-column'
}

export interface FormField {
    _id?: string
    name: string
    label: { en: string; it: string }
    type: string
    required: boolean
    options?: string[]
    step: number
    order: number
    placeholder?: { en: string; it: string }
}

export interface Service {
    _id: string
    name: { en: string; it: string }
    slug: string
    category: string
    description: { en: string; it: string }
    icon: string
    color: string
    isActive: boolean
    steps: Step[]
    fields: FormField[]
}

export const COLD_EMAIL_SERVICE: Service = {
    _id: 'cold-email-service-id',
    name: {
        en: 'Onboarding Cold Email Marketing',
        it: 'Onboarding Marketing Cold Email'
    },
    slug: 'cold-email-marketing',
    category: 'Marketing',
    description: {
        en: 'Powered by Intelligent B2B - The Royal Reach System',
        it: 'Gestito da Intelligent B2B - Il Sistema Royal Reach'
    },
    icon: 'Mail',
    color: '#F6B73A',
    isActive: true,
    steps: [
        {
            title: { en: 'Company Details', it: 'Dati Aziendali' },
            description: { en: 'Tell us about your company', it: 'Raccontaci della tua azienda' },
            order: 1,
            layout: 'with-image'
        },
        {
            title: { en: 'Sales Team', it: 'Team Commerciale' },
            description: { en: 'Who handles the sales?', it: 'Chi si occupa delle vendite?' },
            order: 2,
            layout: 'with-image'
        },
        {
            title: { en: 'Ideal Customer Profile (ICP)', it: 'Target Ideale (ICP)' },
            description: { en: 'Define your target audience', it: 'Definisci il tuo pubblico target' },
            order: 3,
            layout: 'two-column'
        },
        {
            title: { en: 'Commercial Proposal', it: 'Proposta Commerciale' },
            description: { en: 'What are you offering?', it: 'Cosa stai offrendo?' },
            order: 4,
            layout: 'two-column'
        },
        {
            title: { en: 'Domains & Email Accounts', it: 'Domini & Caselle Email' },
            description: { en: 'Technical setup details', it: 'Dettagli setup tecnico' },
            order: 5,
            layout: 'two-column'
        },
        {
            title: { en: 'Message & Tone', it: 'Messaggio & Tonalità' },
            description: { en: 'How should we communicate?', it: 'Come dovremmo comunicare?' },
            order: 6,
            layout: 'two-column'
        },
        {
            title: { en: 'Approval & Materials', it: 'Approvazione e Materiali' },
            description: { en: 'Final steps and assets', it: 'Ultimi passi e asset' },
            order: 7,
            layout: 'two-column'
        }
    ],
    fields: [
        {
            name: 'companyName',
            label: { en: 'Company Name', it: 'Nome azienda' },
            type: 'text',
            required: true,
            step: 1,
            order: 1
        },
        {
            name: 'mainSector',
            label: { en: 'Main Sector', it: 'Settore principale' },
            type: 'text',
            required: true,
            step: 1,
            order: 2
        },
        {
            name: 'website',
            label: { en: 'Website', it: 'Sito web' },
            type: 'url',
            required: true,
            step: 1,
            order: 3
        },
        {
            name: 'legalName',
            label: { en: 'Full Legal Name', it: 'Ragione sociale completa' },
            type: 'text',
            required: true,
            step: 1,
            order: 4
        },
        {
            name: 'contactName',
            label: { en: 'Internal Contact (Name & Surname)', it: 'Referente interno (Nome e Cognome)' },
            type: 'text',
            required: true,
            step: 1,
            order: 5
        },
        {
            name: 'email',
            label: { en: 'Main Email', it: 'Email principale per comunicazioni' },
            type: 'email',
            required: true,
            step: 1,
            order: 6
        },
        {
            name: 'phone',
            label: { en: 'Phone / WhatsApp', it: 'Telefono / WhatsApp' },
            type: 'text',
            required: true,
            step: 1,
            order: 7
        },
        {
            name: 'appointmentReceivers',
            label: { en: 'Name and Email for appointments (if more than one, separate with commas)', it: 'Nome e Email chi riceverà gli appuntamenti (Se più di uno, separati da virgola)' },
            type: 'textarea',
            required: true,
            step: 2,
            order: 1
        },
        {
            name: 'contactPhone',
            label: { en: 'Contact Phone', it: 'Telefono/cellulare referente' },
            type: 'text',
            required: true,
            step: 2,
            order: 2
        },
        {
            name: 'idealCustomerDesc',
            label: { en: 'Ideal Customer Description', it: 'Descrizione del cliente ideale' },
            type: 'textarea',
            required: true,
            step: 3,
            order: 1
        },
        {
            name: 'jobTitles',
            label: { en: 'Job Titles / Decision Makers', it: 'Job title / Ruoli decisionali' },
            type: 'text',
            required: true,
            step: 3,
            order: 2
        },
        {
            name: 'includedSectors',
            label: { en: 'Sectors to include', it: 'Settori da includere' },
            type: 'text',
            required: true,
            step: 3,
            order: 3
        },
        {
            name: 'excludedSectors',
            label: { en: 'Sectors to exclude', it: 'Settori da escludere' },
            type: 'text',
            required: false,
            step: 3,
            order: 4
        },
        {
            name: 'geography',
            label: { en: 'Target Geography', it: 'Area geografica target' },
            type: 'text',
            required: true,
            step: 3,
            order: 5
        },
        {
            name: 'companySize',
            label: { en: 'Company Size (revenue and number of employees)', it: 'Dimensione aziendale (fatturato e numero dipendenti)' },
            type: 'text',
            required: true,
            step: 3,
            order: 6
        },
        {
            name: 'productService',
            label: { en: 'Product or Service to promote', it: 'Prodotto o servizio da promuovere' },
            type: 'textarea',
            required: true,
            step: 4,
            order: 1
        },
        {
            name: 'avgPrice',
            label: { en: 'Average Ticket Size', it: 'Prezzo medio di vendita' },
            type: 'text',
            required: true,
            step: 4,
            order: 2
        },
        {
            name: 'salesCycle',
            label: { en: 'Average Sales Cycle', it: 'Durata media del ciclo di vendita' },
            type: 'text',
            required: true,
            step: 4,
            order: 3
        },
        {
            name: 'usp',
            label: { en: 'What makes your company/product/service unique? (USP)', it: 'Cosa rende unica la tua azienda/prodotto/servizio (USP)' },
            type: 'textarea',
            required: true,
            step: 4,
            order: 4
        },
        {
            name: 'mainDomain',
            label: { en: 'Main Company Domain', it: 'Dominio principale aziendale' },
            type: 'text',
            required: true,
            step: 5,
            order: 1
        },
        {
            name: 'altDomains',
            label: { en: 'Alternative Domains (2-3 suggestions)', it: 'Domini alternativi suggeriti (2-3)' },
            type: 'text',
            required: false,
            step: 5,
            order: 2
        },
        {
            name: 'emailNames',
            label: { en: 'Email Name Examples (e.g., John Doe, j.doe)', it: 'Esempi di Nomi per le caselle mail (Es. Mario Rossi, m.rossi)' },
            type: 'text',
            required: true,
            step: 5,
            order: 3
        },
        {
            name: 'tone',
            label: { en: 'Desired Tone (professional, friendly...)', it: 'Tono desiderato (professionale, amichevole...)' },
            type: 'text',
            required: true,
            step: 6,
            order: 1
        },
        {
            name: 'existingExamples',
            label: { en: 'Existing communications examples?', it: 'Esempi comunicazioni esistenti' },
            type: 'radio',
            options: ['Sì / Yes', 'No'],
            required: true,
            step: 6,
            order: 2
        },
        {
            name: 'painPoints',
            label: { en: 'Main Target Pain Points', it: 'Principali problemi del target' },
            type: 'textarea',
            required: true,
            step: 6,
            order: 3
        },
        {
            name: 'objections',
            label: { en: 'Common Objections', it: 'Obiezioni comuni' },
            type: 'textarea',
            required: true,
            step: 6,
            order: 4
        },
        {
            name: 'brandGuidelines',
            label: { en: 'Logo & Brand Guidelines', it: 'Logo e brand guideline' },
            type: 'radio',
            options: ['Sì / Yes', 'No'],
            required: true,
            step: 7,
            order: 1
        },
        {
            name: 'materials',
            label: { en: 'Available Materials', it: 'Materiali utili disponibili' },
            type: 'textarea',
            required: false,
            step: 7,
            order: 2
        }
    ]
}

export const FACEBOOK_ADS_SERVICE: Service = {
    _id: 'facebook-ads-service-id',
    name: {
        en: 'Facebook Ads Onboarding',
        it: 'Onboarding Facebook Ads'
    },
    slug: 'facebook-ads-onboarding',
    category: 'Marketing',
    description: {
        en: 'Powered by Intelligent B2B - Meta Performance Division',
        it: 'Gestito da Intelligent B2B - Divisione Meta Performance'
    },
    icon: 'Facebook',
    color: '#1877F2',
    isActive: true,
    steps: [
        {
            title: { en: 'Company Details', it: 'Dati Aziendali' },
            description: { en: 'Basic information about your business', it: 'Informazioni di base sulla tua attività' },
            order: 1,
            layout: 'with-image'
        },
        {
            title: { en: 'Business Structure & Offers', it: 'Struttura Business & Offerte' },
            description: { en: 'Tell us about your products and services', it: 'Raccontaci dei tuoi prodotti e servizi' },
            order: 2,
            layout: 'with-image'
        },
        {
            title: { en: 'Ideal Customer Profile (ICP)', it: 'Target Ideale (ICP)' },
            description: { en: 'Who is your perfect customer?', it: 'Chi è il tuo cliente perfetto?' },
            order: 3,
            layout: 'two-column'
        },
        {
            title: { en: 'Meta Account Structure', it: 'Struttura Account Meta' },
            description: { en: 'Configure your Business Manager and Facebook Page', it: 'Configura il tuo Business Manager e la tua pagina Facebook' },
            order: 4,
            layout: 'two-column'
        },
        {
            title: { en: 'Creative Resources', it: 'Risorse Creative' },
            description: { en: 'Asset per le tue campagne', it: 'Asset per le tue campagne' },
            order: 5,
            layout: 'two-column'
        }
    ],
    fields: [
        {
            name: 'companyName',
            label: { en: 'Company Name', it: 'Nome azienda' },
            type: 'text',
            required: true,
            step: 1,
            order: 1
        },
        {
            name: 'mainSector',
            label: { en: 'Main Sector', it: 'Settore principale' },
            type: 'text',
            required: true,
            step: 1,
            order: 2
        },
        {
            name: 'website',
            label: { en: 'Website', it: 'Sito web' },
            type: 'url',
            required: true,
            step: 1,
            order: 3
        },
        {
            name: 'legalName',
            label: { en: 'Full Legal Name', it: 'Ragione sociale completa' },
            type: 'text',
            required: true,
            step: 1,
            order: 4
        },
        {
            name: 'contactName',
            label: { en: 'Internal Contact (Name & Surname)', it: 'Referente interno (Nome e Cognome)' },
            type: 'text',
            required: true,
            step: 1,
            order: 5
        },
        {
            name: 'email',
            label: { en: 'Main Email', it: 'Email principale per comunicazioni' },
            type: 'email',
            required: true,
            step: 1,
            order: 6
        },
        {
            name: 'phone',
            label: { en: 'Phone / WhatsApp', it: 'Telefono / WhatsApp' },
            type: 'text',
            required: true,
            step: 1,
            order: 7
        },
        {
            name: 'mainProductService',
            label: { en: 'Main Product / Service to promote', it: 'Prodotto / Servizio principale da promuovere' },
            type: 'textarea',
            required: true,
            step: 2,
            order: 1
        },
        {
            name: 'shortDesc',
            label: { en: 'Short description of the service (benefit for the client)', it: 'Descrizione breve del servizio (beneficio per il cliente)' },
            type: 'textarea',
            required: true,
            step: 2,
            order: 2
        },
        {
            name: 'priceRange',
            label: { en: 'Average price or price range', it: 'Prezzo medio o fascia di prezzo' },
            type: 'text',
            required: true,
            step: 2,
            order: 3
        },
        {
            name: 'activePromotions',
            label: { en: 'Active offers or promotions (optional)', it: 'Offerte o promozioni attive (facoltativo)' },
            type: 'textarea',
            required: false,
            step: 2,
            order: 4
        },
        {
            name: 'mainGoal',
            label: { en: 'Main campaign goal', it: 'Obiettivo principale della campagna' },
            type: 'text',
            required: true,
            step: 2,
            order: 5
        },
        {
            name: 'salesCycleDuration',
            label: { en: 'Sales cycle duration (from lead to close)', it: 'Durata del ciclo di vendita (da ottenimento lead a chiusura cliente)' },
            type: 'text',
            required: true,
            step: 2,
            order: 6
        },
        {
            name: 'perfectCustomerProfile',
            label: { en: 'Who is your perfect customer (profile type)', it: 'Chi è il tuo cliente perfetto (profilo tipo)' },
            type: 'textarea',
            required: true,
            step: 3,
            order: 1
        },
        {
            name: 'avgAge',
            label: { en: 'Average age', it: 'Età media' },
            type: 'text',
            required: true,
            step: 3,
            order: 2
        },
        {
            name: 'gender',
            label: { en: 'Prevalent gender', it: 'Genere prevalente' },
            type: 'text',
            required: true,
            step: 3,
            order: 3
        },
        {
            name: 'targetLocation',
            label: { en: 'Target location', it: 'Località target' },
            type: 'text',
            required: true,
            step: 3,
            order: 4
        },
        {
            name: 'relevantInterests',
            label: { en: 'Relevant interests / hobbies', it: 'Interessi / hobby rilevanti' },
            type: 'text',
            required: true,
            step: 3,
            order: 5
        },
        {
            name: 'segmentsToExclude',
            label: { en: 'Segments to exclude', it: 'Segmenti da escludere' },
            type: 'text',
            required: false,
            step: 3,
            order: 6
        },
        {
            name: 'businessManagerActive',
            label: { en: 'Do you already have an active Business Manager?', it: 'Hai già un Business Manager attivo?' },
            type: 'radio',
            options: ['SI / YES', 'NO'],
            required: true,
            step: 4,
            order: 1
        },
        {
            name: 'metaInstructions',
            label: {
                en: 'Instructions: Share ad account and FB page (see tutorial link in description)',
                it: 'Istruzioni: Condividi account pubblicitario e pagina Facebook (vedi link tutorial in descrizione)'
            },
            placeholder: {
                en: 'Tutorial: https://intelligentb2b.com/tutorial | Share to: mattia.bizzoni@gmail.com',
                it: 'Tutorial: https://intelligentb2b.com/tutorial | Condividi a: mattia.bizzoni@gmail.com'
            },
            type: 'textarea',
            required: false,
            step: 4,
            order: 2
        },
        {
            name: 'materialsReady',
            label: { en: 'Are materials ready (images, video, texts, landing page)?', it: 'Hai già materiali pronti (immagini, video, testi, landing page)?' },
            type: 'radio',
            options: ['SI / YES', 'NO'],
            required: true,
            step: 5,
            order: 1
        },
        {
            name: 'resourceLink',
            label: { en: 'Drive link or resource files', it: 'Link drive o file risorse' },
            type: 'url',
            required: false,
            step: 5,
            order: 2
        },
        {
            name: 'graphicStyle',
            label: { en: 'Do you have a defined graphic style (brand book, font, colors, tone)?', it: 'Hai uno stile grafico definito (brand book, font, colori, tono)?' },
            type: 'textarea',
            required: true,
            step: 5,
            order: 3
        },
        {
            name: 'mainLandingUrl',
            label: { en: 'Main landing page / website URL (If present)', it: 'URL landing page/sito web principale (Se Presente)' },
            type: 'url',
            required: false,
            step: 5,
            order: 4
        },
        {
            name: 'pastCampaigns',
            label: { en: 'Have you done Meta Ads campaigns in the past? (describe results and problems)', it: 'Hai fatto campagne Meta Ads in passato (descrivi risultati e problemi)' },
            type: 'textarea',
            required: false,
            step: 5,
            order: 5
        }
    ]
}

export const BLOGGING_SEO_SERVICE: Service = {
    _id: 'blogging-seo-service-id',
    name: {
        en: 'Blogging SEO Friendly',
        it: 'Blogging SEO Friendly'
    },
    slug: 'blogging-seo-friendly',
    category: 'Marketing',
    description: {
        en: 'Dominate search results with high-quality, SEO-optimized content strategy.',
        it: 'Domina i risultati di ricerca con una strategia di contenuti di alta qualità e ottimizzata SEO.'
    },
    icon: 'PenTool',
    color: '#10B981',
    isActive: true,
    steps: [
        {
            title: { en: 'SECTION 1: COMPANY & WEBSITE BASICS', it: 'SEZIONE 1: DATI AZIENDALI E SITO WEB' },
            description: { en: 'Tell us about your business', it: 'Raccontaci della tua attività' },
            order: 1,
            layout: 'with-image'
        },
        {
            title: { en: 'SECTION 2: CURRENT CONTENT SITUATION', it: 'SEZIONE 2: SITUAZIONE ATTUALE CONTENUTI' },
            description: { en: 'How do you handle content today?', it: 'Come gestisci i contenuti oggi?' },
            order: 2,
            layout: 'with-image'
        },
        {
            title: { en: 'SECTION 3: SEO & KEYWORD STRATEGY', it: 'SEZIONE 3: SEO E STRATEGIA KEYWORD' },
            description: { en: 'Defining your search goals', it: 'Definisci i tuoi obiettivi di ricerca' },
            order: 3,
            layout: 'two-column'
        },
        {
            title: { en: 'SECTION 4: CONTENT OBJECTIVES & GOALS', it: 'SEZIONE 4: OBIETTIVI DEI CONTENUTI' },
            description: { en: 'What do you want to achieve?', it: 'Cosa vuoi ottenere?' },
            order: 4,
            layout: 'two-column'
        },
        {
            title: { en: 'SECTION 7: TECHNICAL & CMS DETAILS', it: 'SEZIONE 7: DETTAGLI TECNICI E CMS' },
            description: { en: 'Website infrastructure', it: 'Infrastruttura del sito' },
            order: 5,
            layout: 'two-column'
        },
        {
            title: { en: 'SECTION 8: INTEGRATION & WORKFLOW', it: 'SEZIONE 8: INTEGRAZIONE E WORKFLOW' },
            description: { en: 'How we work together', it: 'Come lavoreremo insieme' },
            order: 6,
            layout: 'two-column'
        }
    ],
    fields: [
        // Section 1
        {
            name: 'companyName',
            label: { en: 'Company Name', it: 'Nome azienda' },
            type: 'text',
            required: true,
            step: 1,
            order: 1
        },
        {
            name: 'websiteUrl',
            label: { en: 'Website URL', it: 'URL Sito Web' },
            type: 'url',
            required: true,
            step: 1,
            order: 2
        },
        {
            name: 'industry',
            label: { en: 'Industry / Sector', it: 'Settore Industriale' },
            type: 'select',
            options: ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Professional Services', 'Manufacturing', 'Other'],
            required: false,
            step: 1,
            order: 3
        },
        {
            name: 'fullName',
            label: { en: 'Full Name', it: 'Nome e Cognome' },
            type: 'text',
            required: true,
            step: 1,
            order: 4
        },
        {
            name: 'email',
            label: { en: 'Email Address', it: 'Indirizzo Email' },
            type: 'email',
            required: true,
            step: 1,
            order: 5
        },
        {
            name: 'country',
            label: { en: 'Country', it: 'Paese' },
            type: 'select',
            options: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
            required: true,
            step: 1,
            order: 6
        },
        {
            name: 'phone',
            label: { en: 'Phone Number (international format e.g. +212 ...)', it: 'Numero di Telefono (formato internazionale es. +212 ...)' },
            type: 'text',
            required: true,
            step: 1,
            order: 7
        },
        // Section 2
        {
            name: 'hasBlog',
            label: { en: 'Do you currently have a blog?', it: 'Hai già un blog attualmente?' },
            type: 'radio',
            options: ['Yes / Sì', 'No'],
            required: true,
            step: 2,
            order: 1
        },
        {
            name: 'blogFrequency',
            label: { en: 'Current blogging frequency', it: 'Frequenza attuale di pubblicazione' },
            type: 'select',
            options: ['Never', 'Daily', 'Twice a week', 'Weekly', 'Bi-weekly', 'Monthly', 'Irregular'],
            required: false,
            step: 2,
            order: 2
        },
        {
            name: 'contentWriter',
            label: { en: 'Who currently writes your content?', it: 'Chi scrive attualmente i tuoi contenuti?' },
            type: 'select',
            options: ['No one', 'Internal team', 'Freelancers', 'Agency', 'Mix'],
            required: false,
            step: 2,
            order: 3
        },
        {
            name: 'blogTraffic',
            label: { en: 'Current blog traffic', it: 'Traffico attuale del blog' },
            type: 'select',
            options: ['<1k monthly visitors', '1k–5k', '5k–20k', '20k+'],
            required: false,
            step: 2,
            order: 4
        },
        {
            name: 'contentChallenges',
            label: { en: 'Biggest content challenges', it: 'Principali sfide nei contenuti' },
            type: 'multiselect',
            options: ['Lack of time', 'Don’t know what to write about', 'Poor search rankings', 'Low engagement', 'No content strategy', 'Technical SEO issues'],
            required: false,
            step: 2,
            order: 5
        },
        // Section 3
        {
            name: 'primaryKeywords',
            label: { en: 'Primary target keywords (5–10 keywords)', it: 'Keyword primarie target (5–10 keyword)' },
            type: 'textarea',
            required: false,
            step: 3,
            order: 1
        },
        {
            name: 'targetAudience',
            label: { en: 'Target audience / customer persona (description)', it: 'Pubblico target / customer persona (descrizione)' },
            type: 'textarea',
            required: false,
            step: 3,
            order: 2
        },
        {
            name: 'geographicTargeting',
            label: { en: 'Geographic targeting', it: 'Target geografico' },
            type: 'select',
            options: ['Local', 'National', 'International'],
            required: false,
            step: 3,
            order: 3
        },
        {
            name: 'seoTools',
            label: { en: 'Current SEO tools used', it: 'Tool SEO utilizzati attualmente' },
            type: 'multiselect',
            options: ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'None', 'Other'],
            required: false,
            step: 3,
            order: 4
        },
        // Section 4
        {
            name: 'contentGoals',
            label: { en: 'Primary content goals', it: 'Obiettivi primari dei contenuti' },
            type: 'multiselect',
            options: ['Increase organic traffic', 'Generate leads', 'Build brand authority', 'Educate customers', 'Support sales team', 'Improve search rankings'],
            required: false,
            step: 4,
            order: 1
        },
        {
            name: 'targetTrafficIncrease',
            label: { en: 'Target monthly organic traffic growth', it: 'Crescita target del traffico organico mensile' },
            type: 'select',
            options: ['25%', '50%', '100%', '200%+'],
            required: false,
            step: 4,
            order: 2
        },
        {
            name: 'leadGenPriority',
            label: { en: 'Lead generation priority', it: 'Priorità generazione lead' },
            type: 'select',
            options: ['High', 'Medium', 'Low'],
            required: false,
            step: 4,
            order: 3
        },
        {
            name: 'topicsOfInterest',
            label: { en: 'Content topics of interest', it: 'Argomenti di interesse per i contenuti' },
            type: 'textarea',
            required: false,
            step: 4,
            order: 4
        },
        // Section 7 (Step 5)
        {
            name: 'cms',
            label: { en: 'Content Management System', it: 'Content Management System' },
            type: 'select',
            options: ['WordPress', 'Webflow', 'Drupal', 'Shopify', 'Custom', 'Other'],
            required: false,
            step: 5,
            order: 1
        },
        {
            name: 'websiteSpeed',
            label: { en: 'Current website speed score', it: 'Punteggio velocità sito attuale' },
            type: 'select',
            options: ['Don’t know', '<50', '50–70', '70–90', '90+'],
            required: false,
            step: 5,
            order: 2
        },
        {
            name: 'mobileOptimization',
            label: { en: 'Mobile optimization status', it: 'Stato ottimizzazione mobile' },
            type: 'select',
            options: ['Fully optimized', 'Partially optimized', 'Not optimized', 'Don’t know'],
            required: false,
            step: 5,
            order: 3
        },
        // Section 8 (Step 6)
        {
            name: 'crm',
            label: { en: 'CRM system used', it: 'Sistema CRM utilizzato' },
            type: 'select',
            options: ['HubSpot', 'Salesforce', 'Pipedrive', 'None', 'Other'],
            required: false,
            step: 6,
            order: 1
        },
        {
            name: 'emailPlatform',
            label: { en: 'Email marketing platform', it: 'Piattaforma email marketing' },
            type: 'select',
            options: ['Mailchimp', 'Constant Contact', 'HubSpot', 'None', 'Other'],
            required: false,
            step: 6,
            order: 2
        },
        {
            name: 'socialPlatforms',
            label: { en: 'Social media platforms', it: 'Piattaforme social media' },
            type: 'multiselect',
            options: ['Facebook', 'LinkedIn', 'Twitter / X', 'Instagram', 'TikTok', 'None'],
            required: false,
            step: 6,
            order: 3
        },
        {
            name: 'commMethod',
            label: { en: 'Preferred communication method', it: 'Metodo di comunicazione preferito' },
            type: 'select',
            options: ['Email', 'Slack', 'Microsoft Teams', 'Phone calls'],
            required: false,
            step: 6,
            order: 4
        }
    ]
}

export const SERVICES: Service[] = [
    COLD_EMAIL_SERVICE,
    FACEBOOK_ADS_SERVICE,
    BLOGGING_SEO_SERVICE
]

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find(s => s.slug === slug)
}
