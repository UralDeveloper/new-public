export default (data) => {
    if (data) {
        useHead(
            {
                title: data.seo_title || data.title || '',
                meta: [
                    {
                        name: 'title',
                        content: data.seo_title || data.title || '',
                    },
                    {
                        name: 'description',
                        content: data.seo_description || data.description || '',
                    },
                    {
                        name: 'keywords',
                        content: data.seo_keywords || data.keywords || '',
                    },
                    {
                        name: 'og_title',
                        content: data.og_title || '',
                    },
                    {
                        name: 'og_description',
                        content: data.og_description || '',
                    },
                    {
                        name: 'og_url',
                        content: data.og_url || '',
                    },
                    {
                        name: 'og_site_name',
                        content: data.og_site_name || '',
                    },
                ]
            }
        )
    }
}