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
    category: 'Advertising',
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
    category: 'Content Strategy',
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
    category: 'Lead Generation',
    description: { en: 'Complete onboarding for Lead Generation and CRM optimization.', it: 'Onboarding completo per la Lead Generation e l\'ottimizzazione del CRM.' },
    icon: 'TrendingUp',
    color: '#F6B73A',
    isActive: true,
    steps: [
        { title: { en: 'SECTION 1: COMPANY & CONTACT BASICS', it: 'SEZIONE 1: DATI AZIENDALI E CONTATTI' }, order: 1, layout: 'with-image' },
        { title: { en: 'SECTION 2: CURRENT LEAD GENERATION SITUATION', it: 'SEZIONE 2: SITUAZIONE ATTUALE LEAD GENERATION' }, order: 2, layout: 'with-image' },
        { title: { en: 'SECTION 3: CRM & SALES PROCESS', it: 'SEZIONE 3: CRM E PROCESSO DI VENDITA' }, order: 3, layout: 'two-column' },
        { title: { en: 'SECTION 4: TARGET AUDIENCE & IDEAL CUSTOMER', it: 'SEZIONE 4: PUBBLICO TARGET E CLIENTE IDEALE' }, order: 4, layout: 'two-column' },
        { title: { en: 'SECTION 5: SERVICE SELECTION & OBJECTIVES', it: 'SEZIONE 5: SELEZIONE DEL SERVIZIO E OBIETTIVI' }, order: 5, layout: 'two-column' },
        { title: { en: 'SECTION 6: LEAD GENERATION GOALS & EXPECTATIONS', it: 'SEZIONE 6: OBIETTIVI E ASPETTATIVE LEAD GENERATION' }, order: 6, layout: 'two-column' },
        { title: { en: 'SECTION 7: CURRENT TOOLS & INTEGRATIONS', it: 'SEZIONE 7: STRUMENTI ATTUALI E INTEGRAZIONI' }, order: 7, layout: 'two-column' },
        { title: { en: 'SECTION 8: BUDGET & INVESTMENT', it: 'SEZIONE 8: BUDGET E INVESTIMENTO' }, order: 8, layout: 'two-column' },
        { title: { en: 'SECTION 9: TECHNICAL REQUIREMENTS', it: 'SEZIONE 9: REQUISITI TECNICI' }, order: 9, layout: 'two-column' },
        { title: { en: 'SECTION 10: COMPETITIVE & MARKET INTELLIGENCE', it: 'SEZIONE 10: INTELLIGENZA COMPETITIVA E DI MERCATO' }, order: 10, layout: 'two-column' },
        { title: { en: 'SECTION 11: COMMUNICATION & WORKFLOW', it: 'SEZIONE 11: COMUNICAZIONE E WORKFLOW' }, order: 11, layout: 'two-column' },
        { title: { en: 'SECTION 12: SPECIFIC CHALLENGES & PAIN POINTS', it: 'SEZIONE 12: SFIDE SPECIFICHE E PUNTI DOLENTI' }, order: 12, layout: 'two-column' }
    ],
    fields: [
        // Section 1: COMPANY & CONTACT BASICS
        { name: 'companyName', label: { en: 'Company Name', it: 'Nome Azienda' }, type: 'text', required: true, step: 1, order: 1 },
        {
            name: 'industry', label: { en: 'Industry/Sector', it: 'Settore / Industria' }, type: 'select', options: [
                { en: 'Technology', it: 'Tecnologia' }, { en: 'Professional Services', it: 'Servizi Professionali' },
                { en: 'Healthcare', it: 'Sanità' }, { en: 'Finance', it: 'Finanza' },
                { en: 'Manufacturing', it: 'Produzione' }, { en: 'E-commerce', it: 'E-commerce' }, { en: 'Other', it: 'Altro' }
            ], required: false, step: 1, order: 2
        },
        { name: 'companySize', label: { en: 'Company Size', it: 'Dimensione Azienda' }, type: 'select', options: ['1-10', '11-50', '51-200', '200+ employees'], required: false, step: 1, order: 3 },
        { name: 'annualRevenue', label: { en: 'Annual Revenue', it: 'Fatturato Annuo' }, type: 'select', options: ['<100k', '100k-500k', '500k-2M', '2M+'], required: false, step: 1, order: 4 },
        { name: 'websiteUrl', label: { en: 'Website URL', it: 'URL Sito Web' }, type: 'url', required: true, step: 1, order: 5 },
        { name: 'contactName', label: { en: 'Primary Contact Name', it: 'Referente Principale' }, type: 'text', required: true, step: 1, order: 6 },
        { name: 'jobTitle', label: { en: 'Job Title/Position', it: 'Ruolo / Posizione' }, type: 'text', required: true, step: 1, order: 7 },
        { name: 'email', label: { en: 'Email Address', it: 'Indirizzo Email' }, type: 'email', required: true, step: 1, order: 8 },
        { name: 'phone', label: { en: 'Phone Number', it: 'Numero di Telefono' }, type: 'text', required: true, step: 1, order: 9 },
        { name: 'linkedin', label: { en: 'LinkedIn Profile', it: 'Profilo LinkedIn' }, type: 'url', required: false, step: 1, order: 10 },

        // Section 2: CURRENT LEAD GENERATION SITUATION
        {
            name: 'currentMethods', label: { en: 'Current lead generation methods', it: 'Metodi attuali di lead generation' }, type: 'multiselect', options: [
                { en: 'Cold calling', it: 'Chiamate a freddo' }, { en: 'Email campaigns', it: 'Campagne email' },
                { en: 'LinkedIn outreach', it: 'Outreach su LinkedIn' }, { en: 'Paid advertising', it: 'Pubblicità a pagamento' },
                { en: 'Content marketing', it: 'Content marketing' }, { en: 'Referrals', it: 'Referral / Passaparola' },
                { en: 'Trade shows/events', it: 'Fiere / Eventi' }, { en: 'None/minimal', it: 'Nessuno / Minimo' }
            ], required: false, step: 2, order: 1
        },
        { name: 'leadVolume', label: { en: 'Monthly lead volume', it: 'Volume lead mensile' }, type: 'select', options: ['<10', '10-50', '50-100', '100-500', '500+'], required: false, step: 2, order: 2 },
        { name: 'leadQualitySat', label: { en: 'Lead quality satisfaction (1-10)', it: 'Soddisfazione qualità lead (1-10)' }, type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], required: false, step: 2, order: 3 },
        {
            name: 'leadGenChallenges', label: { en: 'Biggest lead generation challenges', it: 'Maggiori sfide lead generation' }, type: 'multiselect', options: [
                { en: 'Not enough leads', it: 'Non abbastanza lead' }, { en: 'Poor lead quality', it: 'Qualità dei lead scarsa' },
                { en: 'High cost per lead', it: 'Costo per lead elevato' }, { en: 'Long sales cycles', it: 'Cicli di vendita lunghi' },
                { en: 'No systematic process', it: 'Nessun processo sistematico' }, { en: 'Limited time/resources', it: 'Tempo/risorse limitati' },
                { en: 'Difficulty reaching decision makers', it: 'Difficoltà a raggiungere i decision maker' }
            ], required: false, step: 2, order: 4
        },

        // Section 3: CRM & SALES PROCESS
        { name: 'currentCrm', label: { en: 'Current CRM system', it: 'Sistema CRM attuale' }, type: 'select', options: ['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho', 'Excel/Spreadsheets', 'None', 'Other'], required: false, step: 3, order: 1 },
        {
            name: 'crmSatisfaction', label: { en: 'CRM satisfaction level', it: 'Livello di soddisfazione CRM' }, type: 'select', options: [
                { en: 'Very satisfied', it: 'Molto soddisfatto' }, { en: 'Satisfied', it: 'Soddisfatto' },
                { en: 'Neutral', it: 'Neutrale' }, { en: 'Dissatisfied', it: 'Insoddisfatto' },
                { en: 'Very dissatisfied', it: 'Molto insoddisfatto' }
            ], required: false, step: 3, order: 2
        },
        {
            name: 'salesTeamSize', label: { en: 'Sales team size', it: 'Dimensione team vendita' }, type: 'select', options: [
                { en: 'Just me', it: 'Solo io' }, { en: '2-5 people', it: '2-5 persone' },
                { en: '6-15 people', it: '6-15 persone' }, { en: '15+ people', it: '15+ persone' }
            ], required: false, step: 3, order: 3
        },
        { name: 'salesCycleLength', label: { en: 'Average sales cycle length', it: 'Durata media ciclo di vendita' }, type: 'select', options: ['<1 month', '1-3 months', '3-6 months', '6-12 months', '12+ months'], required: false, step: 3, order: 4 },
        { name: 'avgDealSize', label: { en: 'Average deal size', it: 'Dimensione media trattativa' }, type: 'select', options: ['€500-5k', '€5k-25k', '€25k-100k', '€100k+'], required: false, step: 3, order: 5 },
        { name: 'conversionRate', label: { en: 'Current conversion rate', it: 'Tasso di conversione attuale' }, type: 'select', options: ['<1%', '1-3%', '3-5%', '5-10%', '10%+'], required: false, step: 3, order: 6 },

        // Section 4: TARGET AUDIENCE & IDEAL CUSTOMER
        { name: 'targetCustomerType', label: { en: 'Target customer type', it: 'Tipo di cliente target' }, type: 'select', options: ['B2B', 'B2C', 'Both'], required: false, step: 4, order: 1 },
        { name: 'geographicFocus', label: { en: 'Geographic focus', it: 'Focus geografico' }, type: 'select', options: [{ en: 'Local', it: 'Locale' }, { en: 'National', it: 'Nazionale' }, { en: 'International', it: 'Internazionale' }], required: false, step: 4, order: 2 },
        { name: 'icpDescription', label: { en: 'Ideal customer profile description', it: 'Profilo cliente ideale' }, type: 'textarea', required: true, step: 4, order: 3 },
        { name: 'targetJobTitles', label: { en: 'Target job titles/roles', it: 'Job title / Ruoli target' }, type: 'text', required: false, step: 4, order: 4 },
        { name: 'companySizeTargets', label: { en: 'Company size targets', it: 'Target dimensione azienda' }, type: 'select', options: ['Startups', 'SME', 'Enterprise', 'All sizes'], required: false, step: 4, order: 5 },
        { name: 'industryVerticals', label: { en: 'Industry verticals', it: 'Verticali di settore' }, type: 'text', required: false, step: 4, order: 6 },
        { name: 'prospectBudget', label: { en: 'Budget range of prospects', it: 'Fascia budget potenziali clienti' }, type: 'select', options: ['€1k-10k', '€10k-50k', '€50k-200k', '€200k+'], required: false, step: 4, order: 7 },

        // Section 5: SERVICE SELECTION & OBJECTIVES
        {
            name: 'servicesInterest', label: { en: 'Which Lead Generation & CRM services interest you?', it: 'Quali servizi Lead Generation & CRM ti interessano?' }, type: 'multiselect', options: [
                'TORCH CRM', 'MULTICHANNEL OUTREACH + CRM', 'COLD MAILING + LINKEDIN + CRM', 'LINKEDIN LEAD GENERATION', 'DEM/NEWSLETTER AUTOMATION'
            ], required: true, step: 5, order: 1
        },

        // Section 6: LEAD GENERATION GOALS & EXPECTATIONS
        {
            name: 'primaryObjective', label: { en: 'Primary objective', it: 'Obiettivo primario' }, type: 'multiselect', options: [
                { en: 'Increase lead volume', it: 'Aumentare volume lead' }, { en: 'Improve lead quality', it: 'Migliorare qualità lead' },
                { en: 'Reduce cost per lead', it: 'Ridurre costo per lead' }, { en: 'Accelerate sales cycle', it: 'Accelerare ciclo di vendita' },
                { en: 'Better lead nurturing', it: 'Migliore lead nurturing' }, { en: 'Automate manual processes', it: 'Automazione processi manuali' },
                { en: 'Improve sales team efficiency', it: 'Migliorare efficienza team vendita' }
            ], required: false, step: 6, order: 1
        },
        { name: 'leadTarget', label: { en: 'Monthly lead target', it: 'Target lead mensile' }, type: 'select', options: ['10-25', '25-50', '50-100', '100-250', '250-500', '500+'], required: false, step: 6, order: 2 },
        { name: 'acceptableCpl', label: { en: 'Acceptable cost per lead', it: 'Costo per lead accettabile' }, type: 'select', options: ['€10-25', '€25-50', '€50-100', '€100-200', '€200+'], required: false, step: 6, order: 3 },
        { name: 'timelineResults', label: { en: 'Expected timeline for results', it: 'Tempistica prevista per i risultati' }, type: 'select', options: ['1 month', '2-3 months', '3-6 months', '6+ months'], required: false, step: 6, order: 4 },
        { name: 'metricsPriority', label: { en: 'Success metrics priority', it: 'Priorità metriche di successo' }, type: 'textarea', placeholder: { en: 'e.g., 1. Volume, 2. Quality...', it: 'es. 1. Volume, 2. Qualità...' }, required: false, step: 6, order: 5 },

        // Section 7: CURRENT TOOLS & INTEGRATIONS
        { name: 'emailPlatform', label: { en: 'Email marketing platform', it: 'Piattaforma email marketing' }, type: 'select', options: ['Mailchimp', 'HubSpot', 'Constant Contact', 'None', 'Other'], required: false, step: 7, order: 1 },
        { name: 'linkedinTools', label: { en: 'LinkedIn tools used', it: 'Strumenti LinkedIn utilizzati' }, type: 'select', options: ['Sales Navigator', 'Basic LinkedIn', 'None'], required: false, step: 7, order: 2 },
        { name: 'analyticsTools', label: { en: 'Analytics tools', it: 'Strumenti di analisi' }, type: 'select', options: ['Google Analytics', 'HubSpot', 'Salesforce Analytics', 'None'], required: false, step: 7, order: 3 },
        { name: 'commTools', label: { en: 'Communication tools', it: 'Strumenti di comunicazione' }, type: 'select', options: ['Slack', 'Teams', 'Email only', 'Other'], required: false, step: 7, order: 4 },
        { name: 'bookingSystem', label: { en: 'Calendar/booking system', it: 'Sistema calendario/prenotazione' }, type: 'select', options: ['Calendly', 'HubSpot Meetings', 'Outlook', 'None'], required: false, step: 7, order: 5 },
        { name: 'phoneSystem', label: { en: 'Phone system', it: 'Sistema telefonico' }, type: 'select', options: ['VoIP', 'Traditional', 'Mobile only', 'None'], required: false, step: 7, order: 6 },

        // Section 8: BUDGET & INVESTMENT
        { name: 'monthlyLeadGenBudget', label: { en: 'Monthly budget for lead generation', it: 'Budget mensile per lead generation' }, type: 'select', options: ['€500-1k', '€1k-2.5k', '€2.5k-5k', '€5k-10k', '€10k+'], required: false, step: 8, order: 1 },
        { name: 'setupBudget', label: { en: 'Setup budget availability', it: 'Budget disponibile per il setup' }, type: 'select', options: ['€500-1k', '€1k-2k', '€2k-5k', '€5k+'], required: false, step: 8, order: 2 },
        { name: 'roiExpectations', label: { en: 'ROI expectations', it: 'Aspettative ROI' }, type: 'select', options: ['2x', '3x', '5x', '10x+'], required: false, step: 8, order: 3 },
        {
            name: 'approvalProcess', label: { en: 'Budget approval process', it: 'Processo di approvazione budget' }, type: 'select', options: [
                { en: 'I decide', it: 'Decido io' }, { en: 'Need manager approval', it: 'Serve approvazione manager' },
                { en: 'Board approval', it: 'Approvazione del board' }, { en: 'Other', it: 'Altro' }
            ], required: false, step: 8, order: 4
        },
        {
            name: 'startTime', label: { en: 'When can you start?', it: 'Quando puoi iniziare?' }, type: 'select', options: [
                { en: 'Immediately', it: 'Immediatamente' }, { en: 'Within 2 weeks', it: 'Entro 2 settimane' },
                { en: 'Within 1 month', it: 'Entro 1 mese' }, { en: 'Within 3 months', it: 'Entro 3 mesi' }
            ], required: false, step: 8, order: 5
        },

        // Section 9: TECHNICAL REQUIREMENTS
        {
            name: 'crmIntegration', label: { en: 'CRM integration needs', it: 'Esigenze di integrazione CRM' }, type: 'select', options: [
                { en: 'Must integrate with existing', it: 'Deve integrarsi con l\'attuale' },
                { en: 'Open to new CRM', it: 'Aperto a nuovo CRM' }, { en: 'No preference', it: 'Nessuna preferenza' }
            ], required: false, step: 9, order: 1
        },
        {
            name: 'dataExport', label: { en: 'Data export requirements', it: 'Requisiti esportazione dati' }, type: 'select', options: [
                { en: 'Need to export existing data', it: 'Necessità esportazione dati esistenti' },
                { en: 'Fresh start', it: 'Partenza da zero' }, { en: 'Partial migration', it: 'Migrazione parziale' }
            ], required: false, step: 9, order: 2
        },
        { name: 'compliance', label: { en: 'Compliance requirements', it: 'Requisiti di conformità' }, type: 'multiselect', options: ['GDPR', 'CCPA', 'Industry-specific', 'None'], required: false, step: 9, order: 3 },
        {
            name: 'trainingNeeds', label: { en: 'Team training needs', it: 'Esigenze formazione team' }, type: 'select', options: [
                { en: 'Extensive training', it: 'Formazione approfondita' }, { en: 'Basic training', it: 'Formazione base' },
                { en: 'Self-service', it: 'Self-service' }, { en: 'No training needed', it: 'Nessuna formazione necessaria' }
            ], required: false, step: 9, order: 4
        },
        { name: 'reportingFrequency', label: { en: 'Reporting frequency preference', it: 'Preferenza frequenza reportistica' }, type: 'select', options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'], required: false, step: 9, order: 5 },

        // Section 10: COMPETITIVE & MARKET INTELLIGENCE
        { name: 'competitors', label: { en: 'Main competitors', it: 'Concorrenti principali' }, type: 'textarea', required: false, step: 10, order: 1 },
        { name: 'usp', label: { en: 'What makes you different?', it: 'Cosa vi rende diversi? (USP)' }, type: 'textarea', required: true, step: 10, order: 2 },
        { name: 'threats', label: { en: 'Biggest competitive threats', it: 'Maggiori minacce competitive' }, type: 'textarea', required: false, step: 10, order: 3 },
        { name: 'positioning', label: { en: 'Market positioning', it: 'Posizionamento sul mercato' }, type: 'select', options: ['Premium', 'Mid-market', 'Budget-friendly', 'Specialized'], required: false, step: 10, order: 4 },
        { name: 'agencyExperience', label: { en: 'Previous lead generation agency experience', it: 'Esperienza precedente con agenzie' }, type: 'select', options: [{ en: 'Yes', it: 'Sì' }, { en: 'No', it: 'No' }], required: false, step: 10, order: 5 },

        // Section 11: COMMUNICATION & WORKFLOW
        { name: 'commMethod', label: { en: 'Preferred communication method', it: 'Metodo di comunicazione preferito' }, type: 'select', options: ['Email', 'Phone', 'Video calls', 'Slack/Teams'], required: false, step: 11, order: 1 },
        { name: 'meetingFreq', label: { en: 'Meeting frequency preference', it: 'Frequenza meeting preferita' }, type: 'select', options: ['Weekly', 'Bi-weekly', 'Monthly', 'As needed'], required: false, step: 11, order: 2 },
        { name: 'decisionProcess', label: { en: 'Decision-making process', it: 'Processo decisionale' }, type: 'select', options: ['I decide alone', 'Small team', 'Committee', 'Long process'], required: false, step: 11, order: 3 },
        { name: 'internalChampion', label: { en: 'Internal champion', it: 'Chi promuoverà il progetto internamente?' }, type: 'text', required: false, step: 11, order: 4 },
        { name: 'successMeasurement', label: { en: 'Success measurement', it: 'Misurazione del successo internamente' }, type: 'textarea', required: false, step: 11, order: 5 },

        // Section 12: SPECIFIC CHALLENGES & PAIN POINTS
        { name: 'marketingChallenge', label: { en: 'Biggest sales/marketing challenge', it: 'Maggiore sfida sales/marketing' }, type: 'textarea', required: true, step: 12, order: 1 },
        { name: 'bizConcerns', label: { en: 'What keeps you up at night?', it: 'Cosa ti preoccupa di più?' }, type: 'textarea', required: false, step: 12, order: 2 },
        { name: 'failedAttempts', label: { en: 'Previous failed attempts', it: 'Tentativi precedenti falliti' }, type: 'textarea', required: false, step: 12, order: 3 },
        { name: 'constraints', label: { en: 'Resource constraints', it: 'Vincoli di risorse (tempo, budget, persone)' }, type: 'textarea', required: false, step: 12, order: 4 },
        { name: 'seasonalFactors', label: { en: 'Seasonal business factors', it: 'Fattori stagionali aziendali' }, type: 'textarea', required: false, step: 12, order: 5 }
    ]
}

export const SERVICES: Service[] = [
    COLD_EMAIL_SERVICE,
    FACEBOOK_ADS_SERVICE,
    BLOGGING_SEO_SERVICE,
    LEAD_GEN_CRM_SERVICE
]

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find(s => s.slug === slug)
}
