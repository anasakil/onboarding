'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LangSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'it' : 'en';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A3A52]/50 hover:bg-[#1A3A52] border border-[#1A3A52] hover:border-[#F6B73A]/50 transition-all duration-300 group"
        >
            <Globe className="w-4 h-4 text-[#8F8F94] group-hover:text-[#F6B73A] transition-colors" />
            <span className="text-sm font-medium text-[#8F8F94] group-hover:text-white transition-colors uppercase">
                {locale}
            </span>
        </button>
    );
}
