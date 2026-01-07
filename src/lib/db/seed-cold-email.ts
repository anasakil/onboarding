import dotenv from 'dotenv'
import path from 'path'

// Load environment variables *before* importing db connection
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined')

const COLD_EMAIL_SERVICE = {
    name: {
        en: 'Onboarding Cold Email Marketing',
        it: 'Onboarding Cold Email Marketing'
    },
    slug: 'cold-email-marketing',
    category: 'Marketing',
    description: {
        en: 'Powered by Intelligent B2B - The Royal Reach System',
        it: 'Powered by Intelligent B2B - The Royal Reach System'
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
        // Step 1: Dati Aziendali / Company Details
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

        // Step 2: Team Commerciale / Sales Team
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

        // Step 3: Target Ideale (ICP)
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

        // Step 4: Proposta Commerciale
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

        // Step 5: Domini & Caselle Email
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

        // Step 6: Messaggio & Tonalità
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

        // Step 7: Approvazione e Materiali
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

const FACEBOOK_ADS_SERVICE = {
    name: {
        en: 'Facebook Ads Onboarding',
        it: 'Onboarding Facebook Ads'
    },
    slug: 'facebook-ads-onboarding',
    category: 'Marketing',
    description: {
        en: 'Powered by Intelligent B2B - Meta Performance Division',
        it: 'Powered by Intelligent B2B - Meta Performance Division'
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
            description: { en: 'Assets for your campaigns', it: 'Asset per le tue campagne' },
            order: 5,
            layout: 'two-column'
        }
    ],
    fields: [
        // Step 1: Dati Aziendali / Company Details
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

        // Step 2: Struttura Business & Offerte
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

        // Step 3: Target Ideale (ICP)
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

        // Step 4: Struttura Account Meta
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

        // Step 5: Risorse Creative
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

async function seed() {
    try {
        // Dynamically import db modules after env vars are loaded
        const { connectDB } = await import('./connect')
        const { Service } = await import('./models/service')

        console.log('Connecting to database...')
        await connectDB()
        console.log('Connected!')

        console.log('Deleting all existing services...')
        await Service.deleteMany({})
        console.log('Deleted!')

        console.log('Creating Cold Email Marketing service...')
        await Service.create(COLD_EMAIL_SERVICE)
        console.log('Created!')

        console.log('Creating Facebook Ads service...')
        await Service.create(FACEBOOK_ADS_SERVICE)
        console.log('Created!')

        console.log('Seeding completed successfully.')
        process.exit(0)
    } catch (error) {
        console.error('Seeding failed:', error)
        process.exit(1)
    }
}

seed()
