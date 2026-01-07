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
            title: { en: 'Company & Website Basics', it: 'Dati Aziendali e Sito Web' },
            description: { en: 'Tell us about your business', it: 'Raccontaci della tua attività' },
            order: 1,
            layout: 'with-image'
        },
        {
            title: { en: 'Current Content Situation', it: 'Situazione Attuale Contenuti' },
            description: { en: 'How do you handle content today?', it: 'Come gestisci i contenuti oggi?' },
            order: 2,
            layout: 'with-image'
        },
        {
            title: { en: 'SEO & Keyword Strategy', it: 'SEO e Strategia Keyword' },
            description: { en: 'Defining your search goals', it: 'Definisci i tuoi obiettivi di ricerca' },
            order: 3,
            layout: 'two-column'
        },
        {
            title: { en: 'Content Objectives & Goals', it: 'Obiettivi dei Contenuti' },
            description: { en: 'What do you want to achieve?', it: 'Cosa vuoi ottenere?' },
            order: 4,
            layout: 'two-column'
        },
        {
            title: { en: 'Competitor & Market Analysis', it: 'Analisi Competitor e Mercato' },
            description: { en: 'Understanding the landscape', it: 'Comprendere lo scenario' },
            order: 5,
            layout: 'two-column'
        },
        {
            title: { en: 'Content Preferences & Style', it: 'Preferenze e Stile Contenuti' },
            description: { en: 'Your brand voice and formatting', it: 'Il tuo brand voice e la formattazione' },
            order: 6,
            layout: 'two-column'
        },
        {
            title: { en: 'Technical & CMS Details', it: 'Dettagli Tecnici e CMS' },
            description: { en: 'Website infrastructure', it: 'Infrastruttura del sito' },
            order: 7,
            layout: 'two-column'
        },
        {
            title: { en: 'Integration & Workflow', it: 'Integrazione e Workflow' },
            description: { en: 'How we work together', it: 'Come lavoreremo insieme' },
            order: 8,
            layout: 'two-column'
        },
        {
            title: { en: 'Budget & Timeline', it: 'Budget e Tempistiche' },
            description: { en: 'Investment and scheduling', it: 'Investimento e pianificazione' },
            order: 9,
            layout: 'two-column'
        },
        {
            title: { en: 'Success Metrics & Reporting', it: 'Metriche di Successo e Report' },
            description: { en: 'How we measure results', it: 'Come misuriamo i risultati' },
            order: 10,
            layout: 'two-column'
        },
        {
            title: { en: 'Content Calendar & Planning', it: 'Calendario Editoriale e Planning' },
            description: { en: 'Scheduling and collaboration', it: 'Pianificazione e collaborazione' },
            order: 11,
            layout: 'two-column'
        },
        {
            title: { en: 'Special Requirements', it: 'Requisiti Speciali' },
            description: { en: 'Final details and compliance', it: 'Ultimi dettagli e conformità' },
            order: 12,
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
            label: { en: 'Industry/Sector', it: 'Settore Industriale' },
            type: 'select',
            options: ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Professional Services', 'Manufacturing', 'Other'],
            required: false,
            step: 1,
            order: 3
        },
        {
            name: 'companySize',
            label: { en: 'Company Size', it: 'Dimensione Aziendale' },
            type: 'select',
            options: ['1-10', '11-50', '51-200', '200+ employees'],
            required: false,
            step: 1,
            order: 4
        },
        {
            name: 'primaryContactName',
            label: { en: 'Primary Contact Name', it: 'Nome Referente Principale' },
            type: 'text',
            required: true,
            step: 1,
            order: 5
        },
        {
            name: 'email',
            label: { en: 'Email Address', it: 'Indirizzo Email' },
            type: 'email',
            required: true,
            step: 1,
            order: 6
        },
        {
            name: 'phone',
            label: { en: 'Phone Number', it: 'Numero di Telefono' },
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
            options: ['Yes', 'No'],
            required: false,
            step: 2,
            order: 1
        },
        {
            name: 'blogFrequency',
            label: { en: 'Current blogging frequency', it: 'Frequenza attuale di pubblicazione' },
            type: 'select',
            options: ['Never', 'Weekly', 'Bi-weekly', 'Monthly', 'Irregular'],
            required: false,
            step: 2,
            order: 2
        },
        {
            name: 'contentWriter',
            label: { en: 'Who currently writes content?', it: 'Chi scrive attualmente i contenuti?' },
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
            options: ['<1k', '1k-5k', '5k-20k', '20k+ monthly visitors'],
            required: false,
            step: 2,
            order: 4
        },
        {
            name: 'contentChallenges',
            label: { en: 'Biggest content challenges', it: 'Principali sfide nei contenuti' },
            type: 'multiselect',
            options: ['Lack of time', 'Don\'t know what to write about', 'Poor search rankings', 'Low engagement', 'No content strategy', 'Technical SEO issues'],
            required: false,
            step: 2,
            order: 5
        },
        // Section 3
        {
            name: 'primaryKeywords',
            label: { en: 'Primary target keywords (5-10 main keywords)', it: 'Keyword primarie target (5-10 keyword principali)' },
            type: 'textarea',
            required: false,
            step: 3,
            order: 1
        },
        {
            name: 'targetAudience',
            label: { en: 'Target audience/customer persona', it: 'Pubblico target / customer persona' },
            type: 'textarea',
            placeholder: { en: 'Describe your ideal customer...', it: 'Descrivi il tuo cliente ideale...' },
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
            options: ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'None'],
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
            label: { en: 'Target monthly organic traffic increase', it: 'Aumento target del traffico organico mensile' },
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
        // Section 5
        {
            name: 'mainCompetitors',
            label: { en: 'Main competitors (list 3-5)', it: 'Principali competitor (elenca 3-5)' },
            type: 'textarea',
            required: false,
            step: 5,
            order: 1
        },
        {
            name: 'competitorBlogs',
            label: { en: 'Competitor blogs you admire', it: 'Blog dei competitor che ammiri' },
            type: 'textarea',
            required: false,
            step: 5,
            order: 2
        },
        {
            name: 'industryPublications',
            label: { en: 'Industry publications you follow', it: 'Pubblicazioni di settore che segui' },
            type: 'textarea',
            required: false,
            step: 5,
            order: 3
        },
        {
            name: 'uvp',
            label: { en: 'What makes you different from competitors?', it: 'Cosa ti differenzia dai tuoi competitor?' },
            type: 'textarea',
            required: false,
            step: 5,
            order: 4
        },
        // Section 6
        {
            name: 'contentTone',
            label: { en: 'Preferred content tone', it: 'Tono dei contenuti preferito' },
            type: 'select',
            options: ['Professional', 'Conversational', 'Technical', 'Friendly', 'Authoritative'],
            required: false,
            step: 6,
            order: 1
        },
        {
            name: 'contentTypes',
            label: { en: 'Content types preferred', it: 'Tipi di contenuti preferiti' },
            type: 'multiselect',
            options: ['How-to guides', 'Industry news/trends', 'Case studies', 'Product comparisons', 'Expert interviews', 'Research reports', 'FAQ articles'],
            required: false,
            step: 6,
            order: 2
        },
        {
            name: 'articleLength',
            label: { en: 'Average article length preference', it: 'Preferenza lunghezza media articoli' },
            type: 'select',
            options: ['500-1000', '1000-2000', '2000-3000', '3000+ words'],
            required: false,
            step: 6,
            order: 3
        },
        {
            name: 'visualContent',
            label: { en: 'Visual content needs', it: 'Esigenze di contenuti visuali' },
            type: 'multiselect',
            options: ['Images only', 'Infographics', 'Videos', 'Interactive content'],
            required: false,
            step: 6,
            order: 4
        },
        // Section 7
        {
            name: 'cms',
            label: { en: 'Content Management System', it: 'Content Management System (CMS)' },
            type: 'select',
            options: ['WordPress', 'Webflow', 'Drupal', 'Shopify', 'Custom', 'Other'],
            required: false,
            step: 7,
            order: 1
        },
        {
            name: 'publishingResponsibility',
            label: { en: 'Who will publish content?', it: 'Chi pubblicherà i contenuti?' },
            type: 'select',
            options: ['You handle', 'We handle', 'Shared responsibility'],
            required: false,
            step: 7,
            order: 2
        },
        {
            name: 'websiteSpeed',
            label: { en: 'Current website speed score', it: 'Punteggio attuale velocità sito' },
            type: 'select',
            options: ['Don\'t know', '<50', '50-70', '70-90', '90+'],
            required: false,
            step: 7,
            order: 3
        },
        {
            name: 'mobileOptimization',
            label: { en: 'Mobile optimization status', it: 'Stato ottimizzazione mobile' },
            type: 'select',
            options: ['Fully optimized', 'Partially', 'Not optimized', 'Don\'t know'],
            required: false,
            step: 7,
            order: 4
        },
        // Section 8
        {
            name: 'crm',
            label: { en: 'CRM system used', it: 'Sistema CRM utilizzato' },
            type: 'select',
            options: ['HubSpot', 'Salesforce', 'Pipedrive', 'None', 'Other'],
            required: false,
            step: 8,
            order: 1
        },
        {
            name: 'emailPlatform',
            label: { en: 'Email marketing platform', it: 'Piattaforma email marketing' },
            type: 'select',
            options: ['Mailchimp', 'Constant Contact', 'HubSpot', 'None', 'Other'],
            required: false,
            step: 8,
            order: 2
        },
        {
            name: 'socialPlatforms',
            label: { en: 'Social media platforms', it: 'Piattaforme social media' },
            type: 'multiselect',
            options: ['Facebook', 'LinkedIn', 'Twitter', 'Instagram', 'TikTok', 'None'],
            required: false,
            step: 8,
            order: 3
        },
        {
            name: 'commMethod',
            label: { en: 'Preferred communication method', it: 'Metodo di comunicazione preferito' },
            type: 'select',
            options: ['Email', 'Slack', 'Teams', 'Phone calls'],
            required: false,
            step: 8,
            order: 4
        },
        // Section 9
        {
            name: 'monthlyBudget',
            label: { en: 'Monthly content budget', it: 'Budget mensile contenuti' },
            type: 'select',
            options: ['€500-750', '€750-1000', '€1000+'],
            required: false,
            step: 9,
            order: 1
        },
        {
            name: 'startDate',
            label: { en: 'When do you want to start?', it: 'Quando vorresti iniziare?' },
            type: 'select',
            options: ['Immediately', 'Within 2 weeks', 'Within 1 month'],
            required: false,
            step: 9,
            order: 2
        },
        {
            name: 'resultsTimeline',
            label: { en: 'Expected timeline for results', it: 'Tempistiche attese per i risultati' },
            type: 'select',
            options: ['1-3 months', '3-6 months', '6-12 months'],
            required: false,
            step: 9,
            order: 3
        },
        {
            name: 'approvalProcess',
            label: { en: 'Content approval process', it: 'Processo di approvazione contenuti' },
            type: 'select',
            options: ['Direct approval', 'Team review', 'Multiple stakeholders'],
            required: false,
            step: 9,
            order: 4
        },
        // Section 10
        {
            name: 'kpis',
            label: { en: 'Most important KPIs', it: 'KPI più importanti' },
            type: 'multiselect',
            options: ['Organic traffic growth', 'Keyword rankings', 'Lead generation', 'Social shares', 'Time on page', 'Conversion rate'],
            required: false,
            step: 10,
            order: 1
        },
        {
            name: 'reportingFrequency',
            label: { en: 'Reporting frequency preference', it: 'Preferenza frequenza reportistica' },
            type: 'select',
            options: ['Weekly', 'Bi-weekly', 'Monthly'],
            required: false,
            step: 10,
            order: 2
        },
        {
            name: 'analyticsAccess',
            label: { en: 'Current analytics access', it: 'Accesso attuale agli analytics' },
            type: 'select',
            options: ['Can provide access', 'Need setup help', 'No analytics'],
            required: false,
            step: 10,
            order: 3
        },
        // Section 11
        {
            name: 'seasonalNeeds',
            label: { en: 'Seasonal content needs', it: 'Esigenze di contenuti stagionali' },
            type: 'textarea',
            required: false,
            step: 11,
            order: 1
        },
        {
            name: 'internalEvents',
            label: { en: 'Internal events/announcements', it: 'Eventi/annunci interni' },
            type: 'textarea',
            required: false,
            step: 11,
            order: 2
        },
        {
            name: 'collaborationLevel',
            label: { en: 'Content collaboration level', it: 'Livello di collaborazione sui contenuti' },
            type: 'select',
            options: ['Full outsourcing', 'Collaborative', 'Guidance only'],
            required: false,
            step: 11,
            order: 3
        },
        {
            name: 'reviewTimeline',
            label: { en: 'Review and approval timeline', it: 'Tempistiche di revisione e approvazione' },
            type: 'select',
            options: ['24h', '48h', '1 week'],
            required: false,
            step: 11,
            order: 4
        },
        // Section 12
        {
            name: 'compliance',
            label: { en: 'Compliance requirements', it: 'Requisiti di conformità' },
            type: 'multiselect',
            options: ['GDPR', 'HIPAA', 'Financial regulations', 'None'],
            required: false,
            step: 12,
            order: 1
        },
        {
            name: 'brandGuidelinesStatus',
            label: { en: 'Brand guidelines available', it: 'Linee guida del brand disponibili' },
            type: 'radio',
            options: ['Yes - will provide', 'Yes - need creation', 'No guidelines'],
            required: false,
            step: 12,
            order: 2
        },
        {
            name: 'multilingualNeeds',
            label: { en: 'Multilingual content needs', it: 'Esigenze di contenuti multilingua' },
            type: 'radio',
            options: ['English only', 'Multiple languages'],
            required: false,
            step: 12,
            order: 3
        },
        {
            name: 'salesIntegration',
            label: { en: 'Integration with sales materials', it: 'Integrazione con materiali di vendita' },
            type: 'radio',
            options: ['Yes', 'No', 'Maybe later'],
            required: false,
            step: 12,
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
