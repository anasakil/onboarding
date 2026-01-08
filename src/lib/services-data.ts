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
    options?: string[] | { en: string; it: string }[]
    step: number
    order: number
    placeholder?: { en: string; it: string }
    showIf?: { field: string; value: string }
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
    category: 'Growth & Ads',
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
            label: { en: 'Average Deal Size', it: 'Valore medio trattativa' },
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
            label: { en: 'Existing communications examples?', it: 'Esempi comunicazioni esistenti?' },
            type: 'radio',
            options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' }
            ],
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
            options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' }
            ],
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
    category: 'Growth & Ads',
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
            label: { en: 'Average deal value or range', it: 'Valore medio o fascia di valore' },
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
            options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' }
            ],
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
            options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' }
            ],
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
    category: 'SEO & Content',
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
            options: [
                { en: 'Technology', it: 'Tecnologia' },
                { en: 'Healthcare', it: 'Sanità' },
                { en: 'Finance', it: 'Finanza' },
                { en: 'E-commerce', it: 'E-commerce' },
                { en: 'Professional Services', it: 'Servizi Professionali' },
                { en: 'Manufacturing', it: 'Produzione' },
                { en: 'Other', it: 'Altro' }
            ],
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
            options: [
                { en: 'Italy', it: 'Italia' },
                { en: 'United States', it: 'Stati Uniti' },
                { en: 'United Kingdom', it: 'Regno Unito' },
                { en: 'Germany', it: 'Germania' },
                { en: 'France', it: 'Francia' },
                { en: 'Spain', it: 'Spagna' },
                { en: 'Switzerland', it: 'Svizzera' },
                { en: 'Other', it: 'Altro' }
            ],
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
            options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' }
            ],
            required: true,
            step: 2,
            order: 1
        },
        {
            name: 'blogFrequency',
            label: { en: 'Current blogging frequency', it: 'Frequenza attuale di pubblicazione' },
            type: 'select',
            options: [
                { en: 'Never', it: 'Mai' },
                { en: 'Daily', it: 'Giornaliera' },
                { en: 'Twice a week', it: 'Due volte a settimana' },
                { en: 'Weekly', it: 'Settimanale' },
                { en: 'Bi-weekly', it: 'Ogni due settimane' },
                { en: 'Monthly', it: 'Mensile' },
                { en: 'Irregular', it: 'Irregolare' }
            ],
            required: false,
            step: 2,
            order: 2
        },
        {
            name: 'contentWriter',
            label: { en: 'Who currently writes your content?', it: 'Chi scrive attualmente i tuoi contenuti?' },
            type: 'select',
            options: [
                { en: 'No one', it: 'Nessuno' },
                { en: 'Internal team', it: 'Team interno' },
                { en: 'Freelancers', it: 'Freelancer' },
                { en: 'Agency', it: 'Agenzia' },
                { en: 'Mix', it: 'Mix' }
            ],
            required: false,
            step: 2,
            order: 3
        },
        {
            name: 'blogTraffic',
            label: { en: 'Current blog traffic', it: 'Traffico attuale del blog' },
            type: 'select',
            options: [
                { en: '<1k monthly visitors', it: '<1k visitatori mensili' },
                { en: '1k–5k', it: '1k–5k' },
                { en: '5k–20k', it: '5k–20k' },
                { en: '20k+', it: '20k+' }
            ],
            required: false,
            step: 2,
            order: 4
        },
        {
            name: 'contentChallenges',
            label: { en: 'Biggest content challenges', it: 'Principali sfide nei contenuti' },
            type: 'multiselect',
            options: [
                { en: 'Lack of time', it: 'Mancanza di tempo' },
                { en: 'Don’t know what to write about', it: 'Non so di cosa scrivere' },
                { en: 'Poor search rankings', it: 'Posizionamento scarso sui motori' },
                { en: 'Low engagement', it: 'Basso coinvolgimento' },
                { en: 'No content strategy', it: 'Nessuna strategia di contenuto' },
                { en: 'Technical SEO issues', it: 'Problemi tecnici SEO' }
            ],
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
            options: [
                { en: 'Local', it: 'Locale' },
                { en: 'National', it: 'Nazionale' },
                { en: 'International', it: 'Internazionale' }
            ],
            required: false,
            step: 3,
            order: 3
        },
        {
            name: 'seoTools',
            label: { en: 'Current SEO tools used', it: 'Tool SEO utilizzati attualmente' },
            type: 'multiselect',
            options: [
                { en: 'Google Analytics', it: 'Google Analytics' },
                { en: 'Google Search Console', it: 'Google Search Console' },
                { en: 'SEMrush', it: 'SEMrush' },
                { en: 'Ahrefs', it: 'Ahrefs' },
                { en: 'None', it: 'Nessuno' },
                { en: 'Other', it: 'Altro' }
            ],
            required: false,
            step: 3,
            order: 4
        },
        // Section 4
        {
            name: 'contentGoals',
            label: { en: 'Primary content goals', it: 'Obiettivi primari dei contenuti' },
            type: 'multiselect',
            options: [
                { en: 'Increase organic traffic', it: 'Aumentare il traffico organico' },
                { en: 'Generate leads', it: 'Generare lead' },
                { en: 'Build brand authority', it: 'Costruire autorità del brand' },
                { en: 'Educate customers', it: 'Educare i clienti' },
                { en: 'Support sales team', it: 'Supportare il team vendite' },
                { en: 'Improve search rankings', it: 'Migliorare il posizionamento' }
            ],
            required: false,
            step: 4,
            order: 1
        },
        {
            name: 'targetTrafficIncrease',
            label: { en: 'Target monthly organic traffic growth', it: 'Crescita target del traffico organico mensile' },
            type: 'select',
            options: [
                { en: '25%', it: '25%' },
                { en: '50%', it: '50%' },
                { en: '100%', it: '100%' },
                { en: '200%+', it: '200%+' }
            ],
            required: false,
            step: 4,
            order: 2
        },
        {
            name: 'leadGenPriority',
            label: { en: 'Lead generation priority', it: 'Priorità generazione lead' },
            type: 'select',
            options: [
                { en: 'High', it: 'Alta' },
                { en: 'Medium', it: 'Media' },
                { en: 'Low', it: 'Bassa' }
            ],
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
            options: [
                { en: 'WordPress', it: 'WordPress' },
                { en: 'Webflow', it: 'Webflow' },
                { en: 'Drupal', it: 'Drupal' },
                { en: 'Shopify', it: 'Shopify' },
                { en: 'Custom', it: 'Custom' },
                { en: 'Other', it: 'Altro' }
            ],
            required: false,
            step: 5,
            order: 1
        },
        {
            name: 'websiteSpeed',
            label: { en: 'Current website speed score', it: 'Punteggio velocità sito attuale' },
            type: 'select',
            options: [
                { en: 'Don’t know', it: 'Non so' },
                { en: '<50', it: '<50' },
                { en: '50–70', it: '50–70' },
                { en: '70–90', it: '70–90' },
                { en: '90+', it: '90+' }
            ],
            required: false,
            step: 5,
            order: 2
        },
        {
            name: 'mobileOptimization',
            label: { en: 'Mobile optimization status', it: 'Stato ottimizzazione mobile' },
            type: 'select',
            options: [
                { en: 'Fully optimized', it: 'Completamente ottimizzato' },
                { en: 'Partially optimized', it: 'Parzialmente ottimizzato' },
                { en: 'Not optimized', it: 'Non ottimizzato' },
                { en: 'Don’t know', it: 'Non so' }
            ],
            required: false,
            step: 5,
            order: 3
        },
        // Section 8 (Step 6)
        {
            name: 'crm',
            label: { en: 'CRM system used', it: 'Sistema CRM utilizzato' },
            type: 'select',
            options: [
                { en: 'HubSpot', it: 'HubSpot' },
                { en: 'Salesforce', it: 'Salesforce' },
                { en: 'Pipedrive', it: 'Pipedrive' },
                { en: 'None', it: 'Nessuno' },
                { en: 'Other', it: 'Altro' }
            ],
            required: false,
            step: 6,
            order: 1
        },
        {
            name: 'emailPlatform',
            label: { en: 'Email marketing platform', it: 'Piattaforma email marketing' },
            type: 'select',
            options: [
                { en: 'Mailchimp', it: 'Mailchimp' },
                { en: 'Constant Contact', it: 'Constant Contact' },
                { en: 'HubSpot', it: 'HubSpot' },
                { en: 'None', it: 'Nessuno' },
                { en: 'Other', it: 'Altro' }
            ],
            required: false,
            step: 6,
            order: 2
        },
        {
            name: 'socialPlatforms',
            label: { en: 'Social media platforms', it: 'Piattaforme social media' },
            type: 'multiselect',
            options: [
                { en: 'Facebook', it: 'Facebook' },
                { en: 'LinkedIn', it: 'LinkedIn' },
                { en: 'Twitter / X', it: 'Twitter / X' },
                { en: 'Instagram', it: 'Instagram' },
                { en: 'TikTok', it: 'TikTok' },
                { en: 'None', it: 'Nessuna' }
            ],
            required: false,
            step: 6,
            order: 3
        },
        {
            name: 'commMethod',
            label: { en: 'Preferred communication method', it: 'Metodo di comunicazione preferito' },
            type: 'select',
            options: [
                { en: 'Email', it: 'Email' },
                { en: 'Slack', it: 'Slack' },
                { en: 'Microsoft Teams', it: 'Microsoft Teams' },
                { en: 'Phone calls', it: 'Chiamate telefoniche' }
            ],
            required: false,
            step: 6,
            order: 4
        }
    ]
}

export const LEAD_GEN_CRM_SERVICE: Service = {
    _id: 'lead-gen-crm-service-id',
    name: { en: 'Lead Generation & CRM', it: 'Lead Generation e CRM' },
    slug: 'lead-generation-crm',
    category: 'Growth & Ads',
    description: { en: 'Complete onboarding for Lead Generation and CRM optimization.', it: 'Onboarding completo per la Lead Generation e l\'ottimizzazione del CRM.' },
    icon: 'TrendingUp',
    color: '#F6B73A',
    isActive: true,
    steps: [
        { title: { en: 'SECTION 1: COMPANY & CONTACT BASICS', it: 'SEZIONE 1: DATI AZIENDALI E CONTATTI' }, order: 1, layout: 'two-column' },
        { title: { en: 'SECTION 2: WEBSITE / BLOG PRESENCE', it: 'SEZIONE 2: PRESENZA SITO WEB / BLOG' }, order: 2, layout: 'two-column' },
        { title: { en: 'SECTION 3: CRM & SALES PROCESS', it: 'SEZIONE 3: CRM E PROCESSO DI VENDITA' }, order: 3, layout: 'two-column' },
        { title: { en: 'SECTION 4: TARGET AUDIENCE & IDEAL CUSTOMER', it: 'SEZIONE 4: PUBBLICO TARGET E CLIENTE IDEALE' }, order: 4, layout: 'two-column' },
        { title: { en: 'SECTION 5: SERVICE SELECTION & OBJECTIVES', it: 'SEZIONE 5: SELEZIONE DEL SERVIZIO E OBIETTIVI' }, order: 5, layout: 'two-column' },
        { title: { en: 'SECTION 6: LEAD GENERATION GOALS', it: 'SEZIONE 6: OBIETTIVI LEAD GENERATION' }, order: 6, layout: 'two-column' },
        { title: { en: 'SECTION 7: TOOLS & INTEGRATIONS', it: 'SEZIONE 7: STRUMENTI E INTEGRAZIONI' }, order: 7, layout: 'two-column' },
        { title: { en: 'SECTION 8: BUDGET & INVESTMENT', it: 'SEZIONE 8: BUDGET E INVESTIMENTO' }, order: 8, layout: 'two-column' },
        { title: { en: 'SECTION 9: TECHNICAL REQUIREMENTS', it: 'SEZIONE 9: REQUISITI TECNICI' }, order: 9, layout: 'two-column' },
        { title: { en: 'SECTION 10: COMPETITIVE & MARKET CONTEXT', it: 'SEZIONE 10: CONTESTO COMPETITIVO E DI MERCATO' }, order: 10, layout: 'two-column' },
        { title: { en: 'SECTION 11: COMMUNICATION & WORKFLOW', it: 'SEZIONE 11: COMUNICAZIONE E WORKFLOW' }, order: 11, layout: 'two-column' },
        { title: { en: 'SECTION 12: PAIN POINTS & CHALLENGES', it: 'SEZIONE 12: PUNTI DOLENTI E SFIDE' }, order: 12, layout: 'two-column' }
    ],
    fields: [
        // Section 1: COMPANY & CONTACT BASICS
        { name: 'companyName', label: { en: 'Company Name', it: 'Nome Azienda' }, type: 'text', required: true, step: 1, order: 1 },
        {
            name: 'industry', label: { en: 'Industry / Sector', it: 'Settore / Industria' }, type: 'select', options: [
                { en: 'Technology', it: 'Tecnologia' }, { en: 'Professional Services', it: 'Servizi Professionali' },
                { en: 'Healthcare', it: 'Sanità' }, { en: 'Finance', it: 'Finanza' },
                { en: 'Manufacturing', it: 'Produzione' }, { en: 'E-commerce', it: 'E-commerce' }, { en: 'Other', it: 'Altro' }
            ], required: false, step: 1, order: 2
        },
        { name: 'companySize', label: { en: 'Company Size', it: 'Dimensione Azienda' }, type: 'select', options: [{ en: '1–10', it: '1–10' }, { en: '11–50', it: '11–50' }, { en: '51–200', it: '51–200' }, { en: '200+', it: '200+' }], required: false, step: 1, order: 3 },
        { name: 'annualRevenue', label: { en: 'Annual Revenue', it: 'Fatturato Annuo' }, type: 'select', options: [{ en: '<100k', it: '<100k' }, { en: '100k–500k', it: '100k–500k' }, { en: '500k–2M', it: '500k–2M' }, { en: '2M+', it: '2M+' }], required: false, step: 1, order: 4 },
        { name: 'fullName', label: { en: 'Full Name', it: 'Nome e Cognome' }, type: 'text', required: true, step: 1, order: 5 },
        { name: 'jobTitle', label: { en: 'Job Title / Position', it: 'Ruolo / Posizione' }, type: 'text', required: true, step: 1, order: 6 },
        { name: 'email', label: { en: 'Email Address', it: 'Indirizzo Email' }, type: 'email', required: true, step: 1, order: 7 },
        { name: 'phone', label: { en: 'Phone Number', it: 'Numero di Telefono' }, type: 'text', required: true, step: 1, order: 8 },
        { name: 'linkedin', label: { en: 'LinkedIn Profile', it: 'Profilo LinkedIn' }, type: 'url', required: false, step: 1, order: 9 },

        // Section 2: WEBSITE / BLOG PRESENCE
        {
            name: 'hasBlogWebsite', label: { en: 'Do you have a blog / website?', it: 'Hai già un blog / sito web?' }, type: 'select', options: [
                { en: 'Yes', it: 'Sì' }, { en: 'No', it: 'No' }
            ], required: true, step: 2, order: 1
        },
        { name: 'websiteUrl', label: { en: 'Website URL / Website', it: 'URL Sito Web' }, type: 'url', required: true, step: 2, order: 2, showIf: { field: 'hasBlogWebsite', value: 'Yes' } },
        {
            name: 'currentMethods', label: { en: 'Current lead generation methods', it: 'Metodi attuali di lead generation' }, type: 'multiselect', options: [
                { en: 'Cold calling', it: 'Chiamate a freddo' }, { en: 'Email campaigns', it: 'Campagne email' },
                { en: 'LinkedIn outreach', it: 'Outreach su LinkedIn' }, { en: 'Paid advertising', it: 'Pubblicità a pagamento' },
                { en: 'Content marketing', it: 'Content marketing' }, { en: 'Referrals', it: 'Referral / Passaparola' },
                { en: 'Trade shows / events', it: 'Fiere / Eventi' }
            ], required: false, step: 2, order: 3, showIf: { field: 'hasBlogWebsite', value: 'Yes' }
        },
        { name: 'leadVolume', label: { en: 'Monthly lead volume', it: 'Volume lead mensile' }, type: 'select', options: [{ en: '<10', it: '<10' }, { en: '10–50', it: '10–50' }, { en: '50–100', it: '50–100' }, { en: '100–500', it: '100–500' }, { en: '500+', it: '500+' }], required: false, step: 2, order: 4, showIf: { field: 'hasBlogWebsite', value: 'Yes' } },
        { name: 'leadQualitySat', label: { en: 'Lead quality satisfaction (scale 1–10)', it: 'Soddisfazione qualità lead (scala 1-10)' }, type: 'select', options: [{ en: '1', it: '1' }, { en: '2', it: '2' }, { en: '3', it: '3' }, { en: '4', it: '4' }, { en: '5', it: '5' }, { en: '6', it: '6' }, { en: '7', it: '7' }, { en: '8', it: '8' }, { en: '9', it: '9' }, { en: '10', it: '10' }], required: false, step: 2, order: 5, showIf: { field: 'hasBlogWebsite', value: 'Yes' } },
        {
            name: 'leadGenChallenges', label: { en: 'Biggest lead generation challenges', it: 'Maggiori sfide lead generation' }, type: 'multiselect', options: [
                { en: 'Not enough leads', it: 'Non abbastanza lead' }, { en: 'Poor lead quality', it: 'Qualità dei lead scarsa' },
                { en: 'High cost per lead', it: 'Costo per lead elevato' }, { en: 'Long sales cycles', it: 'Cicli di vendita lunghi' },
                { en: 'No systematic process', it: 'Nessun processo sistematico' }, { en: 'Limited time / resources', it: 'Tempo / risorse limitati' },
                { en: 'Difficulty reaching decision makers', it: 'Difficoltà a raggiungere i decision maker' }
            ], required: false, step: 2, order: 6, showIf: { field: 'hasBlogWebsite', value: 'Yes' }
        },

        // Section 3: CRM & SALES PROCESS
        {
            name: 'currentCrm', label: { en: 'Current CRM system', it: 'Sistema CRM attuale' }, type: 'select', options: [
                { en: 'HubSpot', it: 'HubSpot' },
                { en: 'Salesforce', it: 'Salesforce' },
                { en: 'Pipedrive', it: 'Pipedrive' },
                { en: 'Zoho', it: 'Zoho' },
                { en: 'Excel / Sheets', it: 'Excel / Fogli di calcolo' },
                { en: 'None', it: 'Nessuno' },
                { en: 'Other', it: 'Altro' }
            ], required: false, step: 3, order: 1
        },
        {
            name: 'crmSatisfaction', label: { en: 'CRM satisfaction level', it: 'Livello di soddisfazione CRM' }, type: 'select', options: [
                { en: 'Very satisfied', it: 'Molto soddisfatto' }, { en: 'Satisfied', it: 'Soddisfatto' },
                { en: 'Neutral', it: 'Neutrale' }, { en: 'Dissatisfied', it: 'Insoddisfatto' },
                { en: 'Very dissatisfied', it: 'Molto insoddisfatto' }
            ], required: false, step: 3, order: 2
        },
        {
            name: 'salesTeamSize', label: { en: 'Sales team size', it: 'Dimensione team vendita' }, type: 'select', options: [
                { en: 'Just me', it: 'Solo io' }, { en: '2–5', it: '2–5' },
                { en: '6–15', it: '6–15' }, { en: '15+', it: '15+' }
            ], required: false, step: 3, order: 3
        },
        {
            name: 'salesCycleLength', label: { en: 'Average sales cycle', it: 'Durata media ciclo di vendita' }, type: 'select', options: [
                { en: '<1 month', it: '<1 mese' },
                { en: '1–3 months', it: '1–3 mesi' },
                { en: '3–6 months', it: '3–6 mesi' },
                { en: '6–12 months', it: '6–12 mesi' },
                { en: '12+ months', it: '12+ mesi' }
            ], required: false, step: 3, order: 4
        },
        { name: 'avgDealSize', label: { en: 'Average deal size', it: 'Dimensione media trattativa' }, type: 'select', options: [{ en: '500–5k', it: '500–5k' }, { en: '5k–25k', it: '5k–25k' }, { en: '25k–100k', it: '25k–100k' }, { en: '100k+', it: '100k+' }], required: false, step: 3, order: 5 },
        { name: 'conversionRate', label: { en: 'Current conversion rate', it: 'Tasso di conversione attuale' }, type: 'select', options: [{ en: '<1%', it: '<1%' }, { en: '1–3%', it: '1–3%' }, { en: '3–5%', it: '3–5%' }, { en: '5–10%', it: '5–10%' }, { en: '10%+', it: '10%+' }], required: false, step: 3, order: 6 },

        // Section 4: TARGET AUDIENCE & IDEAL CUSTOMER
        { name: 'targetCustomerType', label: { en: 'Target customer type (B2B / B2C / Both)', it: 'Tipo di cliente target (B2B / B2C / Entrambi)' }, type: 'select', options: [{ en: 'B2B', it: 'B2B' }, { en: 'B2C', it: 'B2C' }, { en: 'Both', it: 'Entrambi' }], required: false, step: 4, order: 1 },
        { name: 'geographicFocus', label: { en: 'Geographic focus (Local / National / International)', it: 'Focus geografico (Locale / Nazionale / Internazionale)' }, type: 'select', options: [{ en: 'Local', it: 'Locale' }, { en: 'National', it: 'Nazionale' }, { en: 'International', it: 'Internazionale' }], required: false, step: 4, order: 2 },
        { name: 'icpDescription', label: { en: 'Ideal customer profile (text area)', it: 'Profilo cliente ideale (area di testo)' }, type: 'textarea', required: true, step: 4, order: 3 },
        { name: 'targetJobTitles', label: { en: 'Target job titles / roles', it: 'Job title / Ruoli target' }, type: 'text', required: false, step: 4, order: 4 },
        { name: 'companySizeTargets', label: { en: 'Company size targets', it: 'Target dimensione azienda' }, type: 'select', options: [{ en: 'Startups', it: 'Startup' }, { en: 'SME', it: 'PMI' }, { en: 'Enterprise', it: 'Enterprise' }, { en: 'All', it: 'Tutte' }], required: false, step: 4, order: 5 },
        { name: 'industryVerticals', label: { en: 'Industry verticals', it: 'Verticali di settore' }, type: 'text', required: false, step: 4, order: 6 },
        { name: 'prospectBudget', label: { en: 'Budget range of prospects', it: 'Fascia budget potenziali clienti' }, type: 'select', options: [{ en: '1k–10k', it: '1k–10k' }, { en: '10k–50k', it: '10k–50k' }, { en: '50k–200k', it: '50k–200k' }, { en: '200k+', it: '200k+' }], required: false, step: 4, order: 7 },

        // Section 5: SERVICE SELECTION & OBJECTIVES
        {
            name: 'servicesInterest', label: { en: 'Which services interest you? (checkbox)', it: 'Quali servizi ti interessano? (checkbox)' }, type: 'multiselect', options: [
                { en: '🔥 TORCH CRM', it: '🔥 TORCH CRM' },
                { en: '📧 Multichannel Outreach + CRM', it: '📧 Outreach Multicanale + CRM' },
                { en: '❄️ Cold Email + LinkedIn + CRM', it: '❄️ Cold Email + LinkedIn + CRM' },
                { en: '💼 LinkedIn Lead Generation', it: '💼 Lead Generation LinkedIn' },
                { en: '📬 DEM / Newsletter Automation', it: '📬 DEM / Automazione Newsletter' }
            ], required: true, step: 5, order: 1
        },

        // Section 6: LEAD GENERATION GOALS
        {
            name: 'primaryObjective', label: { en: 'Primary objectives (checkbox)', it: 'Obiettivi primari (checkbox)' }, type: 'multiselect', options: [
                { en: 'Increase lead volume', it: 'Aumentare volume lead' }, { en: 'Improve lead quality', it: 'Migliorare qualità lead' },
                { en: 'Reduce cost per lead', it: 'Ridurre costo per lead' }, { en: 'Accelerate sales cycle', it: 'Accelerare ciclo di vendita' },
                { en: 'Better nurturing', it: 'Migliore nurturing' }, { en: 'Automation', it: 'Automazione' },
                { en: 'Sales efficiency', it: 'Efficienza vendite' }
            ], required: false, step: 6, order: 1
        },
        { name: 'leadTarget', label: { en: 'Monthly lead target', it: 'Target lead mensile' }, type: 'select', options: [{ en: '10–25', it: '10–25' }, { en: '25–50', it: '25–50' }, { en: '50–100', it: '50–100' }, { en: '100–250', it: '100–250' }, { en: '250–500', it: '250–500' }, { en: '500+', it: '500+' }], required: false, step: 6, order: 2 },
        { name: 'acceptableCpl', label: { en: 'Acceptable cost per lead', it: 'Costo per lead accettabile' }, type: 'select', options: [{ en: '10–25', it: '10–25' }, { en: '25–50', it: '25–50' }, { en: '50–100', it: '50–100' }, { en: '100–200', it: '100–200' }, { en: '200+', it: '200+' }], required: false, step: 6, order: 3 },
        {
            name: 'timelineResults', label: { en: 'Expected timeline', it: 'Tempistica prevista' }, type: 'select', options: [
                { en: '1 month', it: '1 mese' },
                { en: '2–3 months', it: '2–3 mesi' },
                { en: '3–6 months', it: '3–6 mesi' },
                { en: '6+ months', it: '6+ mesi' }
            ], required: false, step: 6, order: 4
        },
        { name: 'metricsPriority', label: { en: 'Success metric priority (rank 1–5)', it: 'Priorità metriche di successo (rank 1-5)' }, type: 'textarea', placeholder: { en: 'e.g., 1. Volume, 2. Quality...', it: 'es. 1. Volume, 2. Qualità...' }, required: false, step: 6, order: 5 },

        // Section 7: TOOLS & INTEGRATIONS
        { name: 'emailPlatform', label: { en: 'Email marketing platform', it: 'Piattaforma email marketing' }, type: 'select', options: [{ en: 'Mailchimp', it: 'Mailchimp' }, { en: 'HubSpot', it: 'HubSpot' }, { en: 'Constant Contact', it: 'Constant Contact' }, { en: 'None', it: 'Nessuna' }, { en: 'Other', it: 'Altro' }], required: false, step: 7, order: 1 },
        { name: 'linkedinTools', label: { en: 'LinkedIn tools', it: 'Strumenti LinkedIn' }, type: 'select', options: [{ en: 'Sales Navigator', it: 'Sales Navigator' }, { en: 'Basic LinkedIn', it: 'LinkedIn Base' }, { en: 'None', it: 'Nessuno' }], required: false, step: 7, order: 2 },
        { name: 'analyticsTools', label: { en: 'Analytics tools', it: 'Strumenti di analisi' }, type: 'select', options: [{ en: 'Google Analytics', it: 'Google Analytics' }, { en: 'HubSpot', it: 'HubSpot' }, { en: 'Salesforce Analytics', it: 'Salesforce Analytics' }, { en: 'None', it: 'Nessuno' }], required: false, step: 7, order: 3 },
        { name: 'commTools', label: { en: 'Communication tools', it: 'Strumenti di comunicazione' }, type: 'select', options: [{ en: 'Slack', it: 'Slack' }, { en: 'Teams', it: 'Teams' }, { en: 'Email only', it: 'Solo Email' }, { en: 'Other', it: 'Altro' }], required: false, step: 7, order: 4 },
        { name: 'bookingSystem', label: { en: 'Calendar / booking system', it: 'Sistema calendario / prenotazione' }, type: 'select', options: [{ en: 'Calendly', it: 'Calendly' }, { en: 'HubSpot Meetings', it: 'HubSpot Meetings' }, { en: 'Outlook', it: 'Outlook' }, { en: 'None', it: 'Nessuno' }], required: false, step: 7, order: 5 },
        { name: 'phoneSystem', label: { en: 'Phone system', it: 'Sistema telefonico' }, type: 'select', options: [{ en: 'VoIP', it: 'VoIP' }, { en: 'Traditional', it: 'Tradizionale' }, { en: 'Mobile only', it: 'Solo cellulare' }, { en: 'None', it: 'Nessuno' }], required: false, step: 7, order: 6 },

        // Section 8: BUDGET & INVESTMENT
        { name: 'monthlyLeadGenBudget', label: { en: 'Monthly budget', it: 'Budget mensile' }, type: 'select', options: [{ en: '500–1k', it: '500–1k' }, { en: '1k–2.5k', it: '1k–2.5k' }, { en: '2.5k–5k', it: '2.5k–5k' }, { en: '5k–10k', it: '5k–10k' }, { en: '10k+', it: '10k+' }], required: false, step: 8, order: 1 },
        { name: 'setupBudget', label: { en: 'Setup budget', it: 'Budget setup' }, type: 'select', options: [{ en: '500–1k', it: '500–1k' }, { en: '1k–2k', it: '1k–2k' }, { en: '2k–5k', it: '2k–5k' }, { en: '5k+', it: '5k+' }], required: false, step: 8, order: 2 },
        { name: 'roiExpectations', label: { en: 'ROI expectations', it: 'Aspettative ROI' }, type: 'select', options: [{ en: '2x', it: '2x' }, { en: '3x', it: '3x' }, { en: '5x', it: '5x' }, { en: '10x+', it: '10x+' }], required: false, step: 8, order: 3 },
        {
            name: 'approvalProcess', label: { en: 'Budget approval process', it: 'Processo di approvazione budget' }, type: 'select', options: [
                { en: 'I decide', it: 'Decido io' }, { en: 'Need manager approval', it: 'Serve approvazione manager' },
                { en: 'Board approval', it: 'Approvazione del board' }, { en: 'Other', it: 'Altro' }
            ], required: false, step: 8, order: 4
        },
        {
            name: 'startTime', label: { en: 'Start timeline', it: 'Tempistica inizio' }, type: 'select', options: [
                { en: 'Immediately', it: 'Immediatamente' }, { en: 'Within 2 weeks', it: 'Entro 2 settimane' },
                { en: 'Within 1 month', it: 'Entro 1 mese' }, { en: 'Within 3 months', it: 'Entro 3 mesi' }
            ], required: false, step: 8, order: 5
        },

        // Section 9: TECHNICAL REQUIREMENTS
        {
            name: 'crmIntegration', label: { en: 'CRM integration preference', it: 'Preferenza integrazione CRM' }, type: 'select', options: [
                { en: 'Must integrate with existing', it: 'Deve integrarsi con l\'attuale' },
                { en: 'Open to new CRM', it: 'Aperto a nuovo CRM' }, { en: 'No preference', it: 'Nessuna preferenza' }
            ], required: false, step: 9, order: 1
        },
        {
            name: 'dataExport', label: { en: 'Data migration needs', it: 'Esigenze migrazione dati' }, type: 'select', options: [
                { en: 'Need to export existing data', it: 'Necessità esportazione dati esistenti' },
                { en: 'Fresh start', it: 'Partenza da zero' }, { en: 'Partial migration', it: 'Migrazione parziale' }
            ], required: false, step: 9, order: 2
        },
        { name: 'compliance', label: { en: 'Compliance requirements', it: 'Requisiti di conformità' }, type: 'multiselect', options: [{ en: 'GDPR', it: 'GDPR' }, { en: 'CCPA', it: 'CCPA' }, { en: 'Industry-specific', it: 'Specifiche del settore' }, { en: 'None', it: 'Nessuno' }], required: false, step: 9, order: 3 },
        {
            name: 'trainingNeeds', label: { en: 'Training needs', it: 'Esigenze formazione' }, type: 'select', options: [
                { en: 'Extensive training', it: 'Formazione approfondita' }, { en: 'Basic training', it: 'Formazione base' },
                { en: 'Self-service', it: 'Self-service' }, { en: 'No training needed', it: 'Nessuna formazione necessaria' }
            ], required: false, step: 9, order: 4
        },
        { name: 'reportingFrequency', label: { en: 'Reporting frequency', it: 'Frequenza reportistica' }, type: 'select', options: [{ en: 'Daily', it: 'Giornaliera' }, { en: 'Weekly', it: 'Settimanale' }, { en: 'Bi-weekly', it: 'Bisettimanale' }, { en: 'Monthly', it: 'Mensile' }], required: false, step: 9, order: 5 },

        // Section 10: COMPETITIVE & MARKET CONTEXT
        { name: 'competitors', label: { en: 'Main competitors', it: 'Concorrenti principali' }, type: 'textarea', required: false, step: 10, order: 1 },
        { name: 'usp', label: { en: 'Unique value proposition', it: 'Proposta di valore unica (USP)' }, type: 'textarea', required: true, step: 10, order: 2 },
        { name: 'threats', label: { en: 'Competitive threats', it: 'Minacce competitive' }, type: 'textarea', required: false, step: 10, order: 3 },
        { name: 'positioning', label: { en: 'Market positioning', it: 'Posizionamento sul mercato' }, type: 'select', options: [{ en: 'Premium', it: 'Premium' }, { en: 'Mid-market', it: 'Fascia media' }, { en: 'Budget-friendly', it: 'Economico' }, { en: 'Specialized', it: 'Specializzato' }], required: false, step: 10, order: 4 },
        { name: 'agencyExperience', label: { en: 'Previous agency experience', it: 'Esperienza precedente con agenzie' }, type: 'select', options: [{ en: 'Yes', it: 'Sì' }, { en: 'No', it: 'No' }], required: false, step: 10, order: 5 },

        // Section 11: COMMUNICATION & WORKFLOW
        { name: 'commMethod', label: { en: 'Preferred communication', it: 'Comunicazione preferita' }, type: 'select', options: [{ en: 'Email', it: 'Email' }, { en: 'Phone', it: 'Telefono' }, { en: 'Video calls', it: 'Videochiamate' }, { en: 'Slack / Teams', it: 'Slack / Teams' }], required: false, step: 11, order: 1 },
        { name: 'meetingFreq', label: { en: 'Meeting frequency', it: 'Frequenza meeting' }, type: 'select', options: [{ en: 'Weekly', it: 'Settimanale' }, { en: 'Bi-weekly', it: 'Bisettimanale' }, { en: 'Monthly', it: 'Mensile' }, { en: 'As needed', it: 'Al bisogno' }], required: false, step: 11, order: 2 },
        { name: 'decisionProcess', label: { en: 'Decision-making process', it: 'Processo decisionale' }, type: 'select', options: [{ en: 'I decide alone', it: 'Decido io' }, { en: 'Small team', it: 'Piccolo team' }, { en: 'Committee', it: 'Comitato' }, { en: 'Long process', it: 'Processo lungo' }], required: false, step: 11, order: 3 },
        { name: 'internalChampion', label: { en: 'Internal champion', it: 'Champion interno' }, type: 'text', required: false, step: 11, order: 4 },
        { name: 'successMeasurement', label: { en: 'Internal success measurement', it: 'Misurazione successo interna' }, type: 'textarea', required: false, step: 11, order: 5 },

        // Section 12: PAIN POINTS & CHALLENGES
        { name: 'marketingChallenge', label: { en: 'Biggest challenge', it: 'Maggiore sfida' }, type: 'textarea', required: true, step: 12, order: 1 },
        { name: 'bizConcerns', label: { en: 'Business concerns', it: 'Preoccupazioni aziendali' }, type: 'textarea', required: false, step: 12, order: 2 },
        { name: 'failedAttempts', label: { en: 'Previous failures', it: 'Fallimenti precedenti' }, type: 'textarea', required: false, step: 12, order: 3 },
        { name: 'constraints', label: { en: 'Resource constraints', it: 'Vincoli di risorse' }, type: 'textarea', required: false, step: 12, order: 4 },
        { name: 'seasonalFactors', label: { en: 'Seasonal factors', it: 'Fattori stagionali' }, type: 'textarea', required: false, step: 12, order: 5 }
    ]
}

export const SEO_CONTENT_SERVICE: Service = {
    _id: 'seo-content-service-id',
    name: { en: 'SEO & Content Strategy', it: 'SEO & Strategia Contenuti' },
    slug: 'seo-content-strategy',
    category: 'SEO & Content',
    description: { en: 'Comprehensive SEO and Content setup.', it: 'Setup completo SEO e Contenuti.' },
    icon: 'Search', // Using Search (closest to Magnifying glass) or similar
    color: '#8B5CF6',
    isActive: true,
    steps: [
        { title: { en: 'SECTION 1: COMPANY & WEBSITE BASICS', it: 'SEZIONE 1: DATI AZIENDALI E SITO WEB' }, order: 1, layout: 'two-column' },
        { title: { en: 'SECTION 2: CURRENT SEO & CONTENT SITUATION', it: 'SEZIONE 2: SITUAZIONE ATTUALE SEO E CONTENUTI' }, order: 2, layout: 'two-column' },
        { title: { en: 'SECTION 3: SERVICE SELECTION & OBJECTIVES', it: 'SEZIONE 3: SELEZIONE DEL SERVIZIO E OBIETTIVI' }, order: 3, layout: 'two-column' },
        { title: { en: 'SECTION 4: TARGET AUDIENCE & KEYWORDS', it: 'SEZIONE 4: TARGET AUDIENCE E KEYWORD' }, order: 4, layout: 'two-column' },
        { title: { en: 'SECTION 5: CONTENT GOALS & EXPECTATIONS', it: 'SEZIONE 5: OBIETTIVI CONTENUTI E ASPETTATIVE' }, order: 5, layout: 'two-column' },
        { title: { en: 'SECTION 6: CURRENT TOOLS & ANALYTICS', it: 'SEZIONE 6: STRUMENTI ATTUALI E ANALYTICS' }, order: 6, layout: 'two-column' },
        { title: { en: 'SECTION 7: CONTENT PREFERENCES & STYLE', it: 'SEZIONE 7: PREFERENZE CONTENUTI E STILE' }, order: 7, layout: 'two-column' },
        { title: { en: 'SECTION 8: LOCAL SEO SPECIFICS', it: 'SEZIONE 8: SPECIFICHE LOCAL SEO' }, order: 8, layout: 'two-column' },
        { title: { en: 'SECTION 9: TECHNICAL & INTEGRATION DETAILS', it: 'SEZIONE 9: DETTAGLI TECNICI E INTEGRAZIONE' }, order: 9, layout: 'two-column' },
        { title: { en: 'SECTION 10: BUDGET & TIMELINE', it: 'SEZIONE 10: BUDGET E TEMPISTICHE' }, order: 10, layout: 'two-column' },
        { title: { en: 'SECTION 11: SUCCESS METRICS & REPORTING', it: 'SEZIONE 11: METRICHE DI SUCCESSO E REPORT' }, order: 11, layout: 'two-column' },
        { title: { en: 'SECTION 12: COMPETITIVE & MARKET INTELLIGENCE', it: 'SEZIONE 12: INTELLIGENCE COMPETITIVA E DI MERCATO' }, order: 12, layout: 'two-column' },
        { title: { en: 'SECTION 13: SPECIAL REQUIREMENTS', it: 'SEZIONE 13: REQUISITI SPECIALI' }, order: 13, layout: 'two-column' }
    ],
    fields: [
        // SECTION 1: COMPANY & WEBSITE BASICS
        { name: 'companyName', label: { en: 'Company Name', it: 'Nome Azienda' }, type: 'text', required: true, step: 1, order: 1 },
        { name: 'websiteUrl', label: { en: 'Website URL', it: 'URL Sito Web' }, type: 'url', required: true, step: 1, order: 2 },
        {
            name: 'industry', label: { en: 'Industry / Sector', it: 'Settore / Industria' }, type: 'select', options: [
                { en: 'Technology', it: 'Tecnologia' }, { en: 'Healthcare', it: 'Sanità' },
                { en: 'Finance', it: 'Finanza' }, { en: 'E-commerce', it: 'E-commerce' },
                { en: 'Professional Services', it: 'Servizi Professionali' }, { en: 'Manufacturing', it: 'Produzione' }, { en: 'Other', it: 'Altro' }
            ], required: false, step: 1, order: 3
        },
        { name: 'companySize', label: { en: 'Company Size', it: 'Dimensione Azienda' }, type: 'select', options: [{ en: '1–10', it: '1–10' }, { en: '11–50', it: '11–50' }, { en: '51–200', it: '51–200' }, { en: '200+', it: '200+' }], required: false, step: 1, order: 4 },
        { name: 'primaryContactName', label: { en: 'Primary Contact Name', it: 'Nome Referente Principale' }, type: 'text', required: true, step: 1, order: 5 },
        { name: 'email', label: { en: 'Email Address', it: 'Indirizzo Email' }, type: 'email', required: true, step: 1, order: 6 },
        { name: 'phone', label: { en: 'Phone Number', it: 'Numero di Telefono' }, type: 'text', required: true, step: 1, order: 7 },

        // SECTION 2: CURRENT SEO & CONTENT SITUATION
        {
            name: 'hasBlog', label: { en: 'Do you currently have a blog?', it: 'Hai già un blog?' }, type: 'select', options: [
                { en: 'Yes', it: 'Sì' }, { en: 'No', it: 'No' }
            ], required: false, step: 2, order: 1
        },
        {
            name: 'blogFrequency', label: { en: 'Current blogging frequency', it: 'Frequenza blogging attuale' }, type: 'select', options: [
                { en: 'Never', it: 'Mai' },
                { en: 'Weekly', it: 'Settimanale' },
                { en: 'Bi-weekly', it: 'Ogni due settimane' },
                { en: 'Monthly', it: 'Mensile' },
                { en: 'Irregular', it: 'Irregolare' }
            ], required: false, step: 2, order: 2
        },
        {
            name: 'contentWriter', label: { en: 'Who currently writes content?', it: 'Chi scrive i contenuti attualmente?' }, type: 'select', options: [
                { en: 'No one', it: 'Nessuno' },
                { en: 'Internal team', it: 'Team interno' },
                { en: 'Freelancers', it: 'Freelancer' },
                { en: 'Agency', it: 'Agenzia' },
                { en: 'Mix', it: 'Mix' }
            ], required: false, step: 2, order: 3
        },
        { name: 'organicTraffic', label: { en: 'Current monthly organic traffic', it: 'Traffico organico mensile attuale' }, type: 'select', options: [{ en: '<1k', it: '<1k' }, { en: '1k–5k', it: '1k–5k' }, { en: '5k–20k', it: '5k–20k' }, { en: '20k+', it: '20k+' }], required: false, step: 2, order: 4 },
        {
            name: 'googleRanking', label: { en: 'Current Google ranking position', it: 'Posizionamento attuale su Google' }, type: 'select', options: [
                { en: 'Don’t know', it: 'Non so' },
                { en: 'Page 2+', it: 'Pagina 2+' },
                { en: 'Page 1 bottom', it: 'Pagina 1 (fondo)' },
                { en: 'Top 5', it: 'Top 5' },
                { en: 'Top 3', it: 'Top 3' }
            ], required: false, step: 2, order: 5
        },
        {
            name: 'seoChallenges', label: { en: 'Biggest SEO/content challenges', it: 'Maggiori sfide SEO/contenuti' }, type: 'multiselect', options: [
                { en: 'Low organic traffic', it: 'Basso traffico organico' }, { en: 'Poor search rankings', it: 'Posizionamento scarso' },
                { en: 'Lack of time for content creation', it: 'Mancanza di tempo per creazione contenuti' }, { en: 'Don’t know what keywords to target', it: 'Non so quali keyword targetizzare' },
                { en: 'Low engagement on content', it: 'Basso engagement sui contenuti' }, { en: 'Technical SEO issues', it: 'Problemi tecnici SEO' },
                { en: 'No content strategy', it: 'Nessuna strategia contenuti' }
            ], required: false, step: 2, order: 6
        },

        // SECTION 3: SERVICE SELECTION & OBJECTIVES
        {
            name: 'interestedServices', label: { en: 'Which SEO & Content services interest you?', it: 'Quali servizi SEO & Contenuti ti interessano?' }, type: 'multiselect', options: [
                { en: '📝 BLOGGING SEO FRIENDLY', it: '📝 BLOGGING SEO FRIENDLY' },
                { en: '🔍 GENERAL SEO', it: '🔍 GENERAL SEO' },
                { en: '📍 LOCAL SEO', it: '📍 LOCAL SEO' },
                { en: '📄 LEAD MAGNET / WHITEPAPER', it: '📄 LEAD MAGNET / WHITEPAPER' }
            ], required: true, step: 3, order: 1
        },

        // SECTION 4: TARGET AUDIENCE & KEYWORDS
        { name: 'primaryAudience', label: { en: 'Primary target audience (detailed description)', it: 'Audience target primaria (descrizione dettagliata)' }, type: 'textarea', required: true, step: 4, order: 1 },
        {
            name: 'geoTargeting', label: { en: 'Geographic targeting', it: 'Target geografico' }, type: 'select', options: [
                { en: 'Local', it: 'Locale' },
                { en: 'National', it: 'Nazionale' },
                { en: 'International', it: 'Internazionale' }
            ], required: false, step: 4, order: 2
        },
        { name: 'targetKeywords', label: { en: 'Current target keywords (5-10 main keywords)', it: 'Keyword target attuali (5-10 principali)' }, type: 'textarea', required: false, step: 4, order: 3 },
        { name: 'competitorWebsites', label: { en: 'Competitor websites (3-5 main competitors)', it: 'Siti competitor (3-5 principali)' }, type: 'textarea', required: false, step: 4, order: 4 },
        { name: 'usp', label: { en: 'Unique value proposition', it: 'Proposta di valore unica (USP)' }, type: 'textarea', required: true, step: 4, order: 5 },
        { name: 'industryTerms', label: { en: 'Industry-specific terminology', it: 'Terminologia specifica del settore' }, type: 'textarea', required: false, step: 4, order: 6 },

        // SECTION 5: CONTENT GOALS & EXPECTATIONS
        {
            name: 'contentObjectives', label: { en: 'Primary content objectives', it: 'Obiettivi primari contenuti' }, type: 'multiselect', options: [
                { en: 'Increase organic traffic', it: 'Aumentare traffico organico' }, { en: 'Generate more leads', it: 'Generare più lead' },
                { en: 'Build brand authority', it: 'Costruire autorità brand' }, { en: 'Educate customers', it: 'Educare i clienti' },
                { en: 'Support sales team', it: 'Supportare team vendite' }, { en: 'Improve search rankings', it: 'Migliorare posizionamento' },
                { en: 'Reduce customer acquisition cost', it: 'Ridurre costo acquisizione clienti' }
            ], required: false, step: 5, order: 1
        },
        { name: 'trafficIncreaseTarget', label: { en: 'Target monthly organic traffic increase', it: 'Incremento target traffico organico mensile' }, type: 'select', options: [{ en: '25%', it: '25%' }, { en: '50%', it: '50%' }, { en: '100%', it: '100%' }, { en: '200%+', it: '200%+' }], required: false, step: 5, order: 2 },
        {
            name: 'resultTimeline', label: { en: 'Expected timeline for results', it: 'Tempistiche attese risultati' }, type: 'select', options: [
                { en: '1-3 months', it: '1-3 mesi' },
                { en: '3-6 months', it: '3-6 mesi' },
                { en: '6-12 months', it: '6-12 mesi' },
                { en: '12+ months', it: '12+ mesi' }
            ], required: false, step: 5, order: 3
        },
        {
            name: 'leadGenPriority', label: { en: 'Lead generation priority', it: 'Priorità lead generation' }, type: 'select', options: [
                { en: 'High', it: 'Alta' },
                { en: 'Medium', it: 'Media' },
                { en: 'Low', it: 'Bassa' }
            ], required: false, step: 5, order: 4
        },
        { name: 'contentTopics', label: { en: 'Content topics of interest', it: 'Argomenti contenuti di interesse' }, type: 'textarea', required: false, step: 5, order: 5 },

        // SECTION 6: CURRENT TOOLS & ANALYTICS
        {
            name: 'seoTools', label: { en: 'Current SEO tools used', it: 'Strumenti SEO utilizzati' }, type: 'multiselect', options: [
                { en: 'Google Analytics', it: 'Google Analytics' },
                { en: 'Google Search Console', it: 'Google Search Console' },
                { en: 'SEMrush', it: 'SEMrush' },
                { en: 'Ahrefs', it: 'Ahrefs' },
                { en: 'Moz', it: 'Moz' },
                { en: 'None', it: 'Nessuno' },
                { en: 'Other', it: 'Altro' }
            ], required: false, step: 6, order: 1
        },
        {
            name: 'cmsSystem', label: { en: 'Content Management System', it: 'Content Management System' }, type: 'select', options: [
                { en: 'WordPress', it: 'WordPress' },
                { en: 'Webflow', it: 'Webflow' },
                { en: 'Drupal', it: 'Drupal' },
                { en: 'Shopify', it: 'Shopify' },
                { en: 'Custom', it: 'Custom' },
                { en: 'Other', it: 'Altro' }
            ], required: false, step: 6, order: 2
        },
        {
            name: 'websiteSpeed', label: { en: 'Current website speed score', it: 'Punteggio velocità sito attuale' }, type: 'select', options: [
                { en: 'Don’t know', it: 'Non so' },
                { en: '<50', it: '<50' },
                { en: '50–70', it: '50–70' },
                { en: '70–90', it: '70–90' },
                { en: '90+', it: '90+' }
            ], required: false, step: 6, order: 3
        },
        {
            name: 'mobileOptimized', label: { en: 'Mobile optimization status', it: 'Stato ottimizzazione mobile' }, type: 'select', options: [
                { en: 'Fully optimized', it: 'Completamente ottimizzato' },
                { en: 'Partially', it: 'Parzialmente' },
                { en: 'Not optimized', it: 'Non ottimizzato' },
                { en: 'Don’t know', it: 'Non so' }
            ], required: false, step: 6, order: 4
        },
        {
            name: 'sslInstalled', label: { en: 'SSL certificate installed', it: 'Certificato SSL installato' }, type: 'select', options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' },
                { en: 'Don’t know', it: 'Non so' }
            ], required: false, step: 6, order: 5
        },

        // SECTION 7: CONTENT PREFERENCES & STYLE
        {
            name: 'contentTone', label: { en: 'Preferred content tone', it: 'Tono contenuti preferito' }, type: 'select', options: [
                { en: 'Professional', it: 'Professionale' },
                { en: 'Conversational', it: 'Conversazionale' },
                { en: 'Technical', it: 'Tecnico' },
                { en: 'Friendly', it: 'Amichevole' },
                { en: 'Authoritative', it: 'Autorevole' }
            ], required: false, step: 7, order: 1
        },
        {
            name: 'contentTypes', label: { en: 'Content types preferred', it: 'Tipi di contenuto preferiti' }, type: 'multiselect', options: [
                { en: 'How-to guides', it: 'Guide How-to' }, { en: 'Industry news/trends', it: 'News/Trend di settore' },
                { en: 'Case studies', it: 'Case study' }, { en: 'Product comparisons', it: 'Comparazioni prodotti' },
                { en: 'Expert interviews', it: 'Interviste esperti' }, { en: 'Research reports', it: 'Report di ricerca' },
                { en: 'FAQ articles', it: 'Articoli FAQ' }, { en: 'Local content', it: 'Contenuti locali' }
            ], required: false, step: 7, order: 2
        },
        {
            name: 'articleLength', label: { en: 'Average article length preference', it: 'Preferenza lunghezza media articoli' }, type: 'select', options: [
                { en: '500-1000 words', it: '500-1000 parole' },
                { en: '1000-2000 words', it: '1000-2000 parole' },
                { en: '2000-3000 words', it: '2000-3000 parole' },
                { en: '3000+ words', it: '3000+ parole' }
            ], required: false, step: 7, order: 3
        },
        {
            name: 'visualNeeds', label: { en: 'Visual content needs', it: 'Esigenze contenuti visivi' }, type: 'select', options: [
                { en: 'Images only', it: 'Solo immagini' },
                { en: 'Infographics', it: 'Infografiche' },
                { en: 'Videos', it: 'Video' },
                { en: 'Interactive content', it: 'Contenuti interattivi' }
            ], required: false, step: 7, order: 4
        },
        {
            name: 'approvalProcess', label: { en: 'Content approval process', it: 'Processo approvazione contenuti' }, type: 'select', options: [
                { en: 'Direct approval', it: 'Approvazione diretta' },
                { en: 'Team review', it: 'Revisione del team' },
                { en: 'Multiple stakeholders', it: 'Multipili stakeholder' }
            ], required: false, step: 7, order: 5
        },

        // SECTION 8: LOCAL SEO SPECIFICS (Visible if '📍 LOCAL SEO' is selected)
        {
            name: 'hasPhysicalLocation', label: { en: 'Business has physical location', it: 'Attività ha sede fisica' }, type: 'select', options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' },
                { en: 'Multiple locations', it: 'Sedi multiple' }
            ], required: false, step: 8, order: 1,
            showIf: { field: 'interestedServices', value: '📍 LOCAL SEO' }
        },
        {
            name: 'gmbClaimed', label: { en: 'Google My Business claimed', it: 'Google My Business rivendicato' }, type: 'select', options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' },
                { en: 'Don’t know', it: 'Non so' }
            ], required: false, step: 8, order: 2,
            showIf: { field: 'interestedServices', value: '📍 LOCAL SEO' }
        },
        {
            name: 'gmbRating', label: { en: 'Current Google My Business rating', it: 'Rating attuale Google My Business' }, type: 'select', options: [
                { en: '<3 stars', it: '<3 stelle' },
                { en: '3-4 stars', it: '3-4 stelle' },
                { en: '4+ stars', it: '4+ stelle' },
                { en: 'No reviews', it: 'Nessuna recensione' }
            ], required: false, step: 8, order: 3,
            showIf: { field: 'interestedServices', value: '📍 LOCAL SEO' }
        },
        {
            name: 'serviceAreas', label: { en: 'Service areas (specific cities/regions)', it: 'Aree di servizio (città/regioni specifiche)' }, type: 'text', required: false, step: 8, order: 4,
            showIf: { field: 'interestedServices', value: '📍 LOCAL SEO' }
        },
        {
            name: 'localCompetitors', label: { en: 'Local competitors', it: 'Competitor locali' }, type: 'textarea', required: false, step: 8, order: 5,
            showIf: { field: 'interestedServices', value: '📍 LOCAL SEO' }
        },
        {
            name: 'directoriesListed', label: { en: 'Local directories listed', it: 'Directory locali presenti' }, type: 'select', options: [
                { en: 'Yelp', it: 'Yelp' },
                { en: 'Yellow Pages', it: 'Pagine Gialle' },
                { en: 'Industry-specific', it: 'Specifiche del settore' },
                { en: 'None', it: 'Nessuna' }
            ], required: false, step: 8, order: 6,
            showIf: { field: 'interestedServices', value: '📍 LOCAL SEO' }
        },

        // SECTION 9: TECHNICAL & INTEGRATION DETAILS
        { name: 'hostingProvider', label: { en: 'Website hosting provider', it: 'Hosting provider sito web' }, type: 'text', required: false, step: 9, order: 1 },
        {
            name: 'whoPublishes', label: { en: 'Who will publish content?', it: 'Chi pubblicherà i contenuti?' }, type: 'select', options: [
                { en: 'You handle', it: 'Voi' },
                { en: 'We handle', it: 'Noi' },
                { en: 'Shared responsibility', it: 'Responsabilità condivisa' }
            ], required: false, step: 9, order: 2
        },
        {
            name: 'crmSystem', label: { en: 'CRM system used', it: 'Sistema CRM utilizzato' }, type: 'select', options: [
                { en: 'HubSpot', it: 'HubSpot' },
                { en: 'Salesforce', it: 'Salesforce' },
                { en: 'Pipedrive', it: 'Pipedrive' },
                { en: 'None', it: 'Nessuno' },
                { en: 'Other', it: 'Altro' }
            ], required: false, step: 9, order: 3
        },
        {
            name: 'emailMarketingPlatform', label: { en: 'Email marketing platform', it: 'Piattaforma email marketing' }, type: 'select', options: [
                { en: 'Mailchimp', it: 'Mailchimp' },
                { en: 'Constant Contact', it: 'Constant Contact' },
                { en: 'HubSpot', it: 'HubSpot' },
                { en: 'None', it: 'Nessuna' },
                { en: 'Other', it: 'Altro' }
            ], required: false, step: 9, order: 4
        },
        {
            name: 'socialPlatforms', label: { en: 'Social media platforms', it: 'Piattaforme social media' }, type: 'multiselect', options: [
                { en: 'Facebook', it: 'Facebook' },
                { en: 'LinkedIn', it: 'LinkedIn' },
                { en: 'Twitter', it: 'Twitter' },
                { en: 'Instagram', it: 'Instagram' },
                { en: 'TikTok', it: 'TikTok' },
                { en: 'None', it: 'Nessuna' }
            ], required: false, step: 9, order: 5
        },
        {
            name: 'communicationPref', label: { en: 'Preferred communication method', it: 'Metodo comunicazione preferito' }, type: 'select', options: [
                { en: 'Email', it: 'Email' },
                { en: 'Slack', it: 'Slack' },
                { en: 'Teams', it: 'Teams' },
                { en: 'Phone calls', it: 'Chiamate telefoniche' }
            ], required: false, step: 9, order: 6
        },

        // SECTION 10: BUDGET & TIMELINE
        { name: 'monthlyBudget', label: { en: 'Monthly SEO/Content budget', it: 'Budget mensile SEO/Contenuti' }, type: 'select', options: [{ en: '€400-700', it: '€400-700' }, { en: '€700-1000', it: '€700-1000' }, { en: '€1000-1500', it: '€1000-1500' }, { en: '€1500+', it: '€1500+' }], required: false, step: 10, order: 1 },
        { name: 'setupBudget', label: { en: 'Setup budget availability', it: 'Disponibilità budget setup' }, type: 'select', options: [{ en: '€250-400', it: '€250-400' }, { en: '€400-600', it: '€400-600' }, { en: '€600+', it: '€600+' }], required: false, step: 10, order: 2 },
        {
            name: 'startTime', label: { en: 'When do you want to start?', it: 'Quando vuoi iniziare?' }, type: 'select', options: [
                { en: 'Immediately', it: 'Immediatamente' },
                { en: 'Within 2 weeks', it: 'Entro 2 settimane' },
                { en: 'Within 1 month', it: 'Entro 1 mese' }
            ], required: false, step: 10, order: 3
        },
        {
            name: 'contractDuration', label: { en: 'Contract duration preference', it: 'Preferenza durata contratto' }, type: 'select', options: [
                { en: '3 months', it: '3 mesi' },
                { en: '6 months', it: '6 mesi' },
                { en: '12 months', it: '12 mesi' },
                { en: 'Month-to-month', it: 'Mensile' }
            ], required: false, step: 10, order: 4
        },
        {
            name: 'budgetApproval', label: { en: 'Budget approval process', it: 'Processo approvazione budget' }, type: 'select', options: [
                { en: 'I decide', it: 'Decido io' },
                { en: 'Need manager approval', it: 'Serve approvazione manager' },
                { en: 'Board approval', it: 'Approvazione del board' }
            ], required: false, step: 10, order: 5
        },

        // SECTION 11: SUCCESS METRICS & REPORTING
        {
            name: 'importantKpis', label: { en: 'Most important KPIs', it: 'KPI più importanti' }, type: 'multiselect', options: [
                { en: 'Organic traffic growth', it: 'Crescita traffico organico' }, { en: 'Keyword rankings', it: 'Ranking keyword' },
                { en: 'Lead generation', it: 'Lead generation' }, { en: 'Brand awareness', it: 'Brand awareness' },
                { en: 'Time on page', it: 'Tempo sulla pagina' }, { en: 'Conversion rate', it: 'Tasso di conversione' },
                { en: 'Local visibility', it: 'Visibilità locale' }
            ], required: false, step: 11, order: 1
        },
        {
            name: 'reportingFreq', label: { en: 'Reporting frequency preference', it: 'Preferenza frequenza report' }, type: 'select', options: [
                { en: 'Weekly', it: 'Settimanale' },
                { en: 'Bi-weekly', it: 'Bisettimanale' },
                { en: 'Monthly', it: 'Mensile' }
            ], required: false, step: 11, order: 2
        },
        {
            name: 'analyticsAccess', label: { en: 'Current analytics access', it: 'Accesso analytics attuale' }, type: 'select', options: [
                { en: 'Can provide access', it: 'Posso fornire accesso' },
                { en: 'Need setup help', it: 'Ho bisogno di aiuto per il setup' },
                { en: 'No analytics', it: 'Nessun analytics' }
            ], required: false, step: 11, order: 3
        },
        { name: 'successMeasurement', label: { en: 'Success measurement (How will you measure success internally?)', it: 'Misurazione successo (Come misurerete il successo internamente?)' }, type: 'textarea', required: false, step: 11, order: 4 },

        // SECTION 12: COMPETITIVE & MARKET INTELLIGENCE
        { name: 'mainCompetitors', label: { en: 'Main competitors (list 3-5 companies)', it: 'Competitor principali (lista 3-5 aziende)' }, type: 'textarea', required: false, step: 12, order: 1 },
        { name: 'admiredContent', label: { en: 'Competitor content you admire (URLs or descriptions)', it: 'Contenuti competitor che apprezzi (URL o descrizioni)' }, type: 'textarea', required: false, step: 12, order: 2 },
        { name: 'industryPubs', label: { en: 'Industry publications you follow', it: 'Pubblicazioni di settore che segui' }, type: 'textarea', required: false, step: 12, order: 3 },
        { name: 'seasonalFactors', label: { en: 'Seasonal business factors', it: 'Fattori stagionali business' }, type: 'textarea', required: false, step: 12, order: 4 },
        {
            name: 'algoUpdates', label: { en: 'Recent algorithm updates impact', it: 'Impatto recenti update algoritmo' }, type: 'select', options: [
                { en: 'Noticed changes', it: 'Notato cambiamenti' },
                { en: 'No impact', it: 'Nessun impatto' },
                { en: 'Don’t monitor', it: 'Non monitoro' }
            ], required: false, step: 12, order: 5
        },

        // SECTION 13: SPECIAL REQUIREMENTS
        {
            name: 'complianceReqs', label: { en: 'Compliance requirements', it: 'Requisiti conformità' }, type: 'select', options: [
                { en: 'GDPR', it: 'GDPR' },
                { en: 'HIPAA', it: 'HIPAA' },
                { en: 'Financial regulations', it: 'Regolamentazioni finanziarie' },
                { en: 'None', it: 'Nessuno' }
            ], required: false, step: 13, order: 1
        },
        {
            name: 'brandGuidelines', label: { en: 'Brand guidelines available', it: 'Brand guidelines disponibili' }, type: 'select', options: [
                { en: 'Yes - will provide', it: 'Sì - le fornirò' },
                { en: 'Yes - need creation', it: 'Sì - serve creazione' },
                { en: 'No guidelines', it: 'Nessuna linea guida' }
            ], required: false, step: 13, order: 2
        },
        {
            name: 'multilingualNeeds', label: { en: 'Multilingual content needs', it: 'Esigenze contenuti multilingua' }, type: 'select', options: [
                { en: 'English only', it: 'Solo Inglese' },
                { en: 'Multiple languages', it: 'Lingue multiple' }
            ], required: false, step: 13, order: 3
        },
        {
            name: 'salesIntegration', label: { en: 'Integration with sales materials', it: 'Integrazione con materiali vendita' }, type: 'select', options: [
                { en: 'Yes', it: 'Sì' },
                { en: 'No', it: 'No' },
                { en: 'Maybe later', it: 'Forse più avanti' }
            ], required: false, step: 13, order: 4
        },
        {
            name: 'collaborationLevel', label: { en: 'Content collaboration level', it: 'Livello collaborazione contenuti' }, type: 'select', options: [
                { en: 'Full outsourcing', it: 'Outsourcing completo' },
                { en: 'Collaborative', it: 'Collaborativo' },
                { en: 'Guidance only', it: 'Solo guida' }
            ], required: false, step: 13, order: 5
        }
    ]
}

export const SERVICES: Service[] = [
    COLD_EMAIL_SERVICE,
    FACEBOOK_ADS_SERVICE,
    BLOGGING_SEO_SERVICE,
    LEAD_GEN_CRM_SERVICE,
    SEO_CONTENT_SERVICE
]

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find(s => s.slug === slug)
}
