# Changelog

## [0.15.0](https://github.com/SaxxyToo/posterpilot/compare/v0.14.0...v0.15.0) (2026-11-02)


### ⚠ BREAKING CHANGES

* **i18n:** deployments that set the UI locale via `LANGUAGE` must rename it to `APP_LANGUAGE`. Hosts that had `LANGUAGE` set for unrelated POSIX reasons will now correctly fall through to the saved setting or Accept-Language instead of being locked.

### Features

* add database readiness probe ([#108](https://github.com/SaxxyToo/posterpilot/issues/108)) ([8be8636](https://github.com/SaxxyToo/posterpilot/commit/8be8636b41cd4d39474d7985ddf3b1e93baaac8f)), closes [#106](https://github.com/SaxxyToo/posterpilot/issues/106)
* add recoverable Kometa split migration ([f809bfe](https://github.com/SaxxyToo/posterpilot/commit/f809bfe3987a5c7f4e08c686acda9bdc1ab969b6))
* add recoverable Kometa split migration ([3a7da77](https://github.com/SaxxyToo/posterpilot/commit/3a7da776c2382230509cbcab889868ea0b266511))
* add toast notifications and skeleton loaders ([8a6a089](https://github.com/SaxxyToo/posterpilot/commit/8a6a08937a9c5ee0b829f2bfce66495f6180c625))
* **branding:** logo'd README hero, favicon, docs logos, Unraid template ([f3add61](https://github.com/SaxxyToo/posterpilot/commit/f3add6113ba8b0ef17546f11279ef5d6f78b7bf4))
* complete product improvement workflows ([bea65c4](https://github.com/SaxxyToo/posterpilot/commit/bea65c4d48c533e897893e6e48d84fe801727671))
* complete product workflows and FUN experiences ([b2d0b2f](https://github.com/SaxxyToo/posterpilot/commit/b2d0b2f693776a7a251f3bb52e509584e31925e0))
* credit the maintainer and Aquarela in the app and docs footers ([5cdd391](https://github.com/SaxxyToo/posterpilot/commit/5cdd391f7bd4d482ac2bf47e6cc55ada9103524b))
* derive truthful artwork coverage from evidence ([#82](https://github.com/SaxxyToo/posterpilot/issues/82)) ([afb4b97](https://github.com/SaxxyToo/posterpilot/commit/afb4b97cbc66b1f07c933ede2fe70bb3d2d31a31))
* discovery stability and per-provider controls ([c12256a](https://github.com/SaxxyToo/posterpilot/commit/c12256a37a7fa89729d126e136127de970e17af0))
* discovery stability and per-provider controls ([4db99f3](https://github.com/SaxxyToo/posterpilot/commit/4db99f3e8c71ed3afeb7e7205038caaea1ab2697))
* enlarge any artwork candidate without staging it ([#81](https://github.com/SaxxyToo/posterpilot/issues/81)) ([aab39b5](https://github.com/SaxxyToo/posterpilot/commit/aab39b58690d66a1638fef69fb749e2d5bf6dd05))
* **events:** activity log / events view (*arr-style) ([2be7cfc](https://github.com/SaxxyToo/posterpilot/commit/2be7cfc15b484a7e14783d3b527e8db08ce2f8f3))
* expand support diagnostics bundle ([22f7d91](https://github.com/SaxxyToo/posterpilot/commit/22f7d916eaefcd593320ee2023d239aefc9e231c)), closes [#107](https://github.com/SaxxyToo/posterpilot/issues/107)
* fun menu with random picker + date-added library sort ([6dc1a83](https://github.com/SaxxyToo/posterpilot/commit/6dc1a83278b610e1284e361c102c0f8be6e4abb7))
* FUN menu with random picker + date-added library sort ([cc96b32](https://github.com/SaxxyToo/posterpilot/commit/cc96b3202a5e4069146f5f7d56e5ee203a39fb5f))
* granular season/episode artwork + collapsible artwork sections ([3be1b04](https://github.com/SaxxyToo/posterpilot/commit/3be1b045ea63d6ce29fd2871f14a2f3f87bb5a94))
* granular season/episode artwork + collapsible artwork sections ([193b12d](https://github.com/SaxxyToo/posterpilot/commit/193b12d98cac3d59a789c30f755d650eca413581))
* **i18n:** add French across the app and docs ([2d2427b](https://github.com/SaxxyToo/posterpilot/commit/2d2427b800d7fbdd2cbc14d181d38fe33d64f866))
* **i18n:** add French across the app and docs ([bad5240](https://github.com/SaxxyToo/posterpilot/commit/bad5240d5d0a5894549c7b192c24a2c9f893f9b5))
* **i18n:** localize UI to en/es/zh/ja/pt-BR with Paraglide + Weblate ([c4ad50e](https://github.com/SaxxyToo/posterpilot/commit/c4ad50ed7625039dc4534c720f0e68a585a94c5a))
* **i18n:** show pending state while switching language ([f007fdd](https://github.com/SaxxyToo/posterpilot/commit/f007fdd39cdb2093623819b78f2ed492bbce9f2a))
* **item:** apply warning-free plans in a single click ([40d8ac2](https://github.com/SaxxyToo/posterpilot/commit/40d8ac23754e13d90685c45edac58c7f344dea20))
* **item:** apply warning-free plans in a single click ([4c21157](https://github.com/SaxxyToo/posterpilot/commit/4c2115769cda274d2604079642600cdf6feeb018))
* **item:** friendly apply result message ([a4b9976](https://github.com/SaxxyToo/posterpilot/commit/a4b9976b381b30ba78dd92df4eb340e909fa34eb))
* Kometa manager — manage Kometa's config.yml from a dedicated page ([26782e1](https://github.com/SaxxyToo/posterpilot/commit/26782e12e7c8575fe6ad5880e27ec891912e8c5d))
* **kometa:** co-locate posterpilot.yml with config.yml + config readers/backups ([e458099](https://github.com/SaxxyToo/posterpilot/commit/e4580991ba5555e402178e0a5a5d1d5ad4c2e04b))
* **kometa:** dedicated /kometa manager page with spotlight hero ([69c6ca7](https://github.com/SaxxyToo/posterpilot/commit/69c6ca7f84b6c361a70a37cc1cc12a4dcaa9aab1))
* **kometa:** enrich catalogs from the manual — full sets, descriptions, enums ([1ea724e](https://github.com/SaxxyToo/posterpilot/commit/1ea724ea49a557f1504454cab4bc2455bec0e2d9))
* **kometa:** full orchestration — connectors, overlays, operations, raw, backups ([aeee6c6](https://github.com/SaxxyToo/posterpilot/commit/aeee6c6b77a80d9ccf2b51c8ff5cdeb1fc816264))
* **kometa:** generalize merge engine + connector/overlay/operation catalogs ([a324bcc](https://github.com/SaxxyToo/posterpilot/commit/a324bcc46f1d00f4acfe80d820b15d2bff4a89ae))
* **kometa:** move management off the Settings tab to /kometa; i18n parity ([b76aaf2](https://github.com/SaxxyToo/posterpilot/commit/b76aaf2c064df06d63d407484264100acafe4083))
* **library:** harden bulk apply and fix selection/feedback gaps ([d9412a5](https://github.com/SaxxyToo/posterpilot/commit/d9412a52929aad28c019f26552cca1919ec0d948))
* **library:** Notion-style filter & sort (popovers + chips) ([33ddd8e](https://github.com/SaxxyToo/posterpilot/commit/33ddd8ed636ddedb94421cd859fa02567f4efe4a))
* **logging:** rotating file log (LOG_DIR), configurable retention, Clear activity ([4c30947](https://github.com/SaxxyToo/posterpilot/commit/4c30947cc157b83cf45f5c572b21636aff035dda))
* manage Kometa config.yml from a new settings tab ([b0db76f](https://github.com/SaxxyToo/posterpilot/commit/b0db76f834a1ff4d27e7b082242fe58f154a0813))
* media-server login, encrypted secrets, and scored artwork suggestions ([71a6430](https://github.com/SaxxyToo/posterpilot/commit/71a64301771e627f44f9c4a04951c1571f0d0480))
* media-server login, encrypted secrets, and scored artwork suggestions ([1184420](https://github.com/SaxxyToo/posterpilot/commit/1184420a91185eacd82aab5491ecb994227aa1e0))
* **media-server:** lock applied artwork on Jellyfin/Emby (opt-in) and restore apply-time locking ([#126](https://github.com/SaxxyToo/posterpilot/issues/126)) ([1bf61fc](https://github.com/SaxxyToo/posterpilot/commit/1bf61fc08141d1415d1d4468b86be2df40f38499))
* **media-server:** MediaServer abstraction (Plex/Jellyfin/Emby) + Plex login & discovery ([f70fe22](https://github.com/SaxxyToo/posterpilot/commit/f70fe22773f1d69348545cf01a76754d77a80bd2))
* name each obstacle in the Kometa migration banner and absorb duplicates ([#93](https://github.com/SaxxyToo/posterpilot/issues/93)) ([e66cd89](https://github.com/SaxxyToo/posterpilot/commit/e66cd8995b36e56edcc012a388c9bfb5ac8e6485))
* **onboarding,update:** wizard library step + What's New modal ([3bc4df3](https://github.com/SaxxyToo/posterpilot/commit/3bc4df30b730929c01ee77f6670cf1e5ec9611e5))
* **onboarding:** settings tabs, first-install wizard, page titles, UA id ([9c69548](https://github.com/SaxxyToo/posterpilot/commit/9c6954854d7fddfa7ad70914458a3a797e3fb104))
* optional arr-style authentication with security hardening ([bfa12c6](https://github.com/SaxxyToo/posterpilot/commit/bfa12c6b6ad8a2897258fec0457e18d668785162))
* optional auth + hardening and the full plan follow-up set (one version) ([d3eaf13](https://github.com/SaxxyToo/posterpilot/commit/d3eaf13c7f80fe05290808ac6b1f1ed9ff6f2a37))
* order artwork providers canonically and reorder them from Provider settings ([#80](https://github.com/SaxxyToo/posterpilot/issues/80)) ([aaf0bf0](https://github.com/SaxxyToo/posterpilot/commit/aaf0bf0dc4c3ab0da573fa75ab484ca172ed1db7))
* **oss:** MIT license, community docs, CI, GHCR publishing, release-please, health endpoint ([5d335d9](https://github.com/SaxxyToo/posterpilot/commit/5d335d96d8fbbaa737287956c29125f5191be818))
* paginate library grid + cached poster-thumbnail proxy ([df87c72](https://github.com/SaxxyToo/posterpilot/commit/df87c72eacae7bc29606be6db67ea7cbf736ef74))
* paginate the library query (WIP — first page + total) ([85eca12](https://github.com/SaxxyToo/posterpilot/commit/85eca12e1a44cdaec5c23fbc488392ed2c5bff5f))
* pick an artwork language per title in the poster picker ([#125](https://github.com/SaxxyToo/posterpilot/issues/125)) ([b03d37f](https://github.com/SaxxyToo/posterpilot/commit/b03d37fc2211761fbc6afce194e376b745f82e48))
* **plex,ui:** plain-IP local connections, trademark disclaimer, drop verbose hint ([c875602](https://github.com/SaxxyToo/posterpilot/commit/c8756029db218b09c7f79bbd5681a9101bdaf3e6))
* prefer an artwork language and load more TMDB results ([#79](https://github.com/SaxxyToo/posterpilot/issues/79)) ([286054b](https://github.com/SaxxyToo/posterpilot/commit/286054b5b5626da922707f3766ff3d64efce38be))
* **providers:** poster-provider abstraction + Fanart.tv, TMDB-artwork, ThePosterDB ([6c6108c](https://github.com/SaxxyToo/posterpilot/commit/6c6108c41f22e4dbf97f71abe4037bf394efb472))
* run artwork undo on the durable job queue ([78699a7](https://github.com/SaxxyToo/posterpilot/commit/78699a7cf5264abe00a0b2736f3aac21e7c6b84c))
* show artwork coverage without overstating it ([#83](https://github.com/SaxxyToo/posterpilot/issues/83)) ([7f8ada3](https://github.com/SaxxyToo/posterpilot/commit/7f8ada3e77bbfb2c6d50836bd48d836a382bc96a))
* theme-kit engine with 11 built-in themes and custom theme authoring ([#110](https://github.com/SaxxyToo/posterpilot/issues/110)) ([7b0225a](https://github.com/SaxxyToo/posterpilot/commit/7b0225af17093cffb34d632a6266188495838697))
* **theposterdb:** account sessions, real sets, and collection set matching ([095d0b0](https://github.com/SaxxyToo/posterpilot/commit/095d0b0605c065e06bc78b837d620592d075c699))
* **theposterdb:** account sessions, real sets, and collection set matching ([6ddcbdc](https://github.com/SaxxyToo/posterpilot/commit/6ddcbdc46383da9ad34c1e7e046cf274b784f251))
* **ui:** MediUX-style redesign — metadata, artwork sets, custom-set builder ([41ccb36](https://github.com/SaxxyToo/posterpilot/commit/41ccb3623d7df85ec1ba59f43c30f22d7c28f80a))
* **ui:** tidy the library toolbar, touch targets and the item apply tray ([#128](https://github.com/SaxxyToo/posterpilot/issues/128)) ([870d09e](https://github.com/SaxxyToo/posterpilot/commit/870d09e1359fad9d8ef1e73dd72a4acbed39e2fc))
* update docs and mantainer info ([16db5d1](https://github.com/SaxxyToo/posterpilot/commit/16db5d186cdb2c92b1039a3dceb52818b811524d))
* **ux:** library polish, update checker, view transitions ([df03665](https://github.com/SaxxyToo/posterpilot/commit/df036659ea7fb33ce07960495ca456cc2a16684d))


### Bug Fixes

* **a11y:** keep popover focus indicator visible on open ([5415fc5](https://github.com/SaxxyToo/posterpilot/commit/5415fc5ac7e56e7509e3a66494b9edd9d288e971))
* **a11y:** resolve frontend audit findings (WCAG AA, reduced-motion, focus) ([7131258](https://github.com/SaxxyToo/posterpilot/commit/7131258edccb80805a9d688c11ab3c65d15a804c))
* **a11y:** resolve frontend audit findings (WCAG AA, reduced-motion, focus) ([6d4ed94](https://github.com/SaxxyToo/posterpilot/commit/6d4ed94424df3ae2e596d7ec1ac5211a872db623))
* accept reverse legacy TMDB variants ([eeca36d](https://github.com/SaxxyToo/posterpilot/commit/eeca36dc6d96a78aad8181458dd42cd8e6669b7d))
* address PR review findings (encryption key persistence, sync watermark, SSRF) ([e0e6422](https://github.com/SaxxyToo/posterpilot/commit/e0e6422330a727c982319e4b46aeb7fbec7ef2c0))
* address second review pass (clock-skew sync, persistent thumb cache, validation) ([0d5adb4](https://github.com/SaxxyToo/posterpilot/commit/0d5adb4f813b7f6d1eacd1e0838291711a85ee9f))
* address third review pass (strict dryRun, guarded suggestion persist, 401 login) ([2cb443d](https://github.com/SaxxyToo/posterpilot/commit/2cb443dbd46c1917856d44bd047a3806de116723))
* allow empty Kometa library stanzas ([525aae8](https://github.com/SaxxyToo/posterpilot/commit/525aae8384ccca257acae0e33def73cf4ee06531))
* apply canonical original artwork safely ([37b1b99](https://github.com/SaxxyToo/posterpilot/commit/37b1b99171cafd0543c61bbd4a3052439c99fd53))
* apply preflighted artwork bytes ([b47a060](https://github.com/SaxxyToo/posterpilot/commit/b47a0600b30b13a81e57b436c512cdb50d528011))
* **apply:** trust ThePosterDB's CDN host for artwork bytes ([1698bb4](https://github.com/SaxxyToo/posterpilot/commit/1698bb4b8586835988f56aaeb2de3227e4d9095f))
* **apply:** trust ThePosterDB's CDN host for artwork bytes ([db2d5d0](https://github.com/SaxxyToo/posterpilot/commit/db2d5d080fe8104fd14adcb0d2dd8661506a0800))
* bound media item scope queries ([c261d79](https://github.com/SaxxyToo/posterpilot/commit/c261d795ab1e13a8d75d248f22a0c32cf1137309))
* bound TMDB repair refresh and queries ([e1069db](https://github.com/SaxxyToo/posterpilot/commit/e1069db733ea37f4bb521e2668346d9740b871d4))
* bound TMDB repair refresh and queries ([9fa5066](https://github.com/SaxxyToo/posterpilot/commit/9fa5066ceaa274221a2f3c715fd6d80aef7d9e7f))
* canonicalize TMDB artwork in apply plans ([58f294b](https://github.com/SaxxyToo/posterpilot/commit/58f294b1e5a2ec7c89d9483c7b28d00f120c5fe1))
* complete the review on the last item of a run ([#101](https://github.com/SaxxyToo/posterpilot/issues/101)) ([f541296](https://github.com/SaxxyToo/posterpilot/commit/f54129649920a2a9d08af274810122621c2ec059))
* **db:** retry reads bounded on SQLITE_BUSY ([e0a7169](https://github.com/SaxxyToo/posterpilot/commit/e0a7169ebc7f746a40a45bdf6961563f0016b2e7))
* **db:** retry reads bounded on SQLITE_BUSY ([dd13aff](https://github.com/SaxxyToo/posterpilot/commit/dd13aff61fc656d30c50501153ecf04448c52203)), closes [#56](https://github.com/SaxxyToo/posterpilot/issues/56)
* **discovery:** queue the collection-set candidate injection ([d08d6d5](https://github.com/SaxxyToo/posterpilot/commit/d08d6d539149ad0eb18e8948c7984b596b5722b9))
* **discovery:** queue the collection-set candidate injection ([ef4b604](https://github.com/SaxxyToo/posterpilot/commit/ef4b604d74d92fcddf8c7c41148523a46db9daf8))
* **discovery:** serialize the full discovery lifecycle and staging writes ([cfd23c4](https://github.com/SaxxyToo/posterpilot/commit/cfd23c414b0babdc1516bb74ab0ce2e5d577f4b1))
* **docs:** build without the app's generated tsconfig ([014180d](https://github.com/SaxxyToo/posterpilot/commit/014180d95df319103d19cac824b931a40ec938ce))
* guard apply-and-next selection races ([c57dad7](https://github.com/SaxxyToo/posterpilot/commit/c57dad747c970dfc8fff8729e5f5917e96bfc8a6))
* guard legacy apply completion by timestamp ([0ed7409](https://github.com/SaxxyToo/posterpilot/commit/0ed7409f15a225b0f634c606ae2eab76a1e3f930))
* harden artwork redirect handling ([735a70e](https://github.com/SaxxyToo/posterpilot/commit/735a70ec2b110b09f6812eed97842baaaafb11ae))
* harden hydrated setup and accessible settings ([1f6eb12](https://github.com/SaxxyToo/posterpilot/commit/1f6eb1232d238df5966dd8833e169611598b8246))
* harden Kometa apply safety ([a95d0ef](https://github.com/SaxxyToo/posterpilot/commit/a95d0ef200c83cdb8c23d009982f20032b65b60a))
* harden Kometa apply safety ([7faf8df](https://github.com/SaxxyToo/posterpilot/commit/7faf8dfb47b4f646be15f61a0dfb76f5fed312fa))
* harden Kometa migration workflow ([21efd76](https://github.com/SaxxyToo/posterpilot/commit/21efd76cad1ab8e05ca0a60f51d5508438787fd1))
* harden legacy apply plan compatibility ([4d9f4d0](https://github.com/SaxxyToo/posterpilot/commit/4d9f4d06deb65363c4ffa6513a3c8f5c6c5240c8))
* harden remote artwork downloads ([9166082](https://github.com/SaxxyToo/posterpilot/commit/9166082bcb352b0a6abdca7092a7519a94a0cf41))
* harden restore maintenance gate, provider timeouts, and review focus ([0bc6348](https://github.com/SaxxyToo/posterpilot/commit/0bc6348eabacd9c0f82d8f1c603b8a6acc466dd7))
* harden TMDB repair and collection discovery ([799c7ed](https://github.com/SaxxyToo/posterpilot/commit/799c7edc20bbbc770248eec4ebfed6f813396ee3))
* harden TMDB repair polling and batching ([a375115](https://github.com/SaxxyToo/posterpilot/commit/a37511591ed1feafe7a57a58d5ccab9d4af96d88))
* **i18n:** rename LANGUAGE env var to APP_LANGUAGE ([f5d5b16](https://github.com/SaxxyToo/posterpilot/commit/f5d5b16b3fad8c69147a4321692826f73801a2c2))
* isolate a failing item instead of abandoning the sync ([#104](https://github.com/SaxxyToo/posterpilot/issues/104)) ([a94065a](https://github.com/SaxxyToo/posterpilot/commit/a94065a64ce57a0702bdbd0cbb660030f967d5d6))
* **jellyfin:** keep the backdrop prune best-effort when the count read fails ([55e4807](https://github.com/SaxxyToo/posterpilot/commit/55e480761e188257639b01e1a972ce9afc0461b5))
* **jellyfin:** only scope the library read to an admin, retry lookup on error ([f21d369](https://github.com/SaxxyToo/posterpilot/commit/f21d36995ca74e21bf4effae10e4deabc4e04583))
* **jellyfin:** read current artwork via /Items?ids= for Jellyfin 10.11.x ([a434ad3](https://github.com/SaxxyToo/posterpilot/commit/a434ad3e7714901b428001618f846cd178645836))
* **jellyfin:** read current artwork via /Items?ids= for Jellyfin 10.11.x ([47a61fe](https://github.com/SaxxyToo/posterpilot/commit/47a61fe33c6d606d1f5e5ec150c9d18a19c8f552))
* **jellyfin:** read the library via /Users/{id}/Items so merged versions collapse ([8be4658](https://github.com/SaxxyToo/posterpilot/commit/8be4658e0ac4aeaa3a7c33cff19c9ec71689066b))
* **jellyfin:** read the library via /Users/{id}/Items so merged versions collapse ([3298bb5](https://github.com/SaxxyToo/posterpilot/commit/3298bb5bb44656218db1566f598e16882672c3c7))
* **jellyfin:** replace the backdrop instead of appending on apply ([ad96d4a](https://github.com/SaxxyToo/posterpilot/commit/ad96d4aa254a650c2423c63922192bee37e982f7))
* **jellyfin:** replace the backdrop instead of appending on apply ([7085863](https://github.com/SaxxyToo/posterpilot/commit/70858633ba12db66eb09cf8da9781b417e6cbb27))
* **jellyfin:** resolve one user scope per collection snapshot ([a2249d2](https://github.com/SaxxyToo/posterpilot/commit/a2249d23b04bca55860cec19f863b1d76487f61d))
* **jellyfin:** user-scope collection and season/episode reads ([0b073ac](https://github.com/SaxxyToo/posterpilot/commit/0b073ac75db359f4e70771f2fa5910a4c423b7de))
* **jellyfin:** user-scope collection and season/episode reads ([8343af1](https://github.com/SaxxyToo/posterpilot/commit/8343af1c5e3db0ecd1aa7df3c92a6a204fc4eada))
* keep release curation off the release branch ([#78](https://github.com/SaxxyToo/posterpilot/issues/78)) ([01f9295](https://github.com/SaxxyToo/posterpilot/commit/01f9295d4f3d627171004193d990c9a91f9d4124))
* keep staged artwork previews consistent ([cac4fbe](https://github.com/SaxxyToo/posterpilot/commit/cac4fbe826ce873b917a6c179249ed3b078eb737))
* keep staged artwork previews efficient ([c711311](https://github.com/SaxxyToo/posterpilot/commit/c711311f35858051ba0f1f748f91216cc542de10))
* **kometa:** address [#16](https://github.com/SaxxyToo/posterpilot/issues/16) review + archive openspec changes ([f80f6b9](https://github.com/SaxxyToo/posterpilot/commit/f80f6b91ca01007557b7072254663279143b698f))
* **kometa:** address PR [#16](https://github.com/SaxxyToo/posterpilot/issues/16) review ([664e2cb](https://github.com/SaxxyToo/posterpilot/commit/664e2cb699c16cc52970e27bcbaec644ae8ebe83))
* **kometa:** address PR [#18](https://github.com/SaxxyToo/posterpilot/issues/18) review ([7b71198](https://github.com/SaxxyToo/posterpilot/commit/7b7119845d43a07f3ab05e79bb33ef7c20a632af))
* log the cause chain on request errors and retry transient open failures ([#98](https://github.com/SaxxyToo/posterpilot/issues/98)) ([dd28466](https://github.com/SaxxyToo/posterpilot/commit/dd284663a379d387772d24600e068e3afe863cfe))
* make TMDB resolution type-safe ([4ab8eb2](https://github.com/SaxxyToo/posterpilot/commit/4ab8eb2ea15c3f6f4648cb8047877efe86f36c8e))
* make TMDB resolution type-safe ([8f91dde](https://github.com/SaxxyToo/posterpilot/commit/8f91dde7bcb23cd60dff5dae196d81e068e9b926))
* match staged artwork after rediscovery ([6dc4016](https://github.com/SaxxyToo/posterpilot/commit/6dc4016b0fff6e7c8188285d091be33ae4e7e938))
* **media-server:** 8s timeout on connection tests so Settings never hangs ([6e226b8](https://github.com/SaxxyToo/posterpilot/commit/6e226b89fb2b71c5ecee4b8e5ccfbf3412543c78))
* migrate canonical artwork provenance ([0ab5702](https://github.com/SaxxyToo/posterpilot/commit/0ab5702f7800d1429656f6b12fddc86c1a685c4f))
* **poster:** address PR [#20](https://github.com/SaxxyToo/posterpilot/issues/20) review (Copilot + Codex) ([7d2fc74](https://github.com/SaxxyToo/posterpilot/commit/7d2fc74b589679dc711a1b3b0c9179685dd725a2))
* preserve Emby backdrops on upload failure ([51a776d](https://github.com/SaxxyToo/posterpilot/commit/51a776d60f0007294c71dce316b3a83215f1c5d5))
* preserve legacy v1 apply plans ([9fd2713](https://github.com/SaxxyToo/posterpilot/commit/9fd2713f962866d1ee5e67ed32883cd9905d0aa0))
* preserve optimized staged previews ([2dd146f](https://github.com/SaxxyToo/posterpilot/commit/2dd146f55871f311192fc331dbfe66992559c19d))
* preserve original artwork candidate assets ([f6bda22](https://github.com/SaxxyToo/posterpilot/commit/f6bda220a3688193407abcc4fc5e5dd73b69a53b))
* preserve staged artwork provenance ([6869ce0](https://github.com/SaxxyToo/posterpilot/commit/6869ce0f647469b0e5e8d6d3d3b592f63faba758))
* recover TMDB items and signals the strict rewrite dropped ([#86](https://github.com/SaxxyToo/posterpilot/issues/86)) ([44db159](https://github.com/SaxxyToo/posterpilot/commit/44db1599f4d72a6b4ab2f129bb3de279d4ae8980))
* refresh TMDB repair state on visibility ([8306bdf](https://github.com/SaxxyToo/posterpilot/commit/8306bdf8289919be6f3799de44e63436f45590aa))
* release prepared artwork after outcomes ([7ad4113](https://github.com/SaxxyToo/posterpilot/commit/7ad41132752af968211c6fecd3252b4d50740483))
* reload a tab left open across an upgrade once a new build is serving ([#116](https://github.com/SaxxyToo/posterpilot/issues/116)) ([9e9e2b4](https://github.com/SaxxyToo/posterpilot/commit/9e9e2b4b55fa1515f2e472410eef6e373a111e90))
* require artwork preflight before apply ([0091133](https://github.com/SaxxyToo/posterpilot/commit/0091133fd232e1366baf0f1c83f2b1cda9756a41))
* resolve rediscovered collection artwork ([52321c8](https://github.com/SaxxyToo/posterpilot/commit/52321c844807fc5482b3d2ba2c18b63b8c509044))
* retain TMDB repair focus refresh ([53091b3](https://github.com/SaxxyToo/posterpilot/commit/53091b308eda34f79ed714172ae46a1f9c89112f))
* scope new-item automation events to each schedule library ([66f8d06](https://github.com/SaxxyToo/posterpilot/commit/66f8d0634f067d0b5959d9b89f140e187cc9ed84))
* **settings:** add a clear control for the ThePosterDB password ([0b61787](https://github.com/SaxxyToo/posterpilot/commit/0b617872277c9a64f971ac344a5927fbc11982cd))
* **settings:** add a clear control for the ThePosterDB password ([cfada2b](https://github.com/SaxxyToo/posterpilot/commit/cfada2bf9bdca8d3b3d3951ff2b69d480ed73fd5)), closes [#57](https://github.com/SaxxyToo/posterpilot/issues/57)
* **settings:** bound the library fetch to 5s so Settings never hangs ([2506137](https://github.com/SaxxyToo/posterpilot/commit/2506137c385e9b270ba848afcf8ba4eb1b5ca9cd))
* **settings:** persist numeric fields with type=number inputs ([4937b0d](https://github.com/SaxxyToo/posterpilot/commit/4937b0d16825e724643daa62b8231bdd02e089e8))
* **setup:** require both Plex URL and token before advancing ([5861a6a](https://github.com/SaxxyToo/posterpilot/commit/5861a6afa522648a838ee9fef6a66126ef4ddc7b))
* sort-state drift and shared sort module from self-review ([3f5c86f](https://github.com/SaxxyToo/posterpilot/commit/3f5c86f5e492624f4636381656a4da9e102fd3c8))
* split Kometa destinations by media type ([c41ac12](https://github.com/SaxxyToo/posterpilot/commit/c41ac122e98fcd29b9f701a3632ba78f6c6bb4eb))
* split Kometa destinations by media type ([abe21be](https://github.com/SaxxyToo/posterpilot/commit/abe21befc1c295fe96d7a3032ffaa37e49825ef0))
* stop artwork writes after cancellation ([6fb47a0](https://github.com/SaxxyToo/posterpilot/commit/6fb47a05362085d3c58abf9661a0873712bef438))
* survive slow library reads and stalled job attempts ([#92](https://github.com/SaxxyToo/posterpilot/issues/92)) ([473fc9c](https://github.com/SaxxyToo/posterpilot/commit/473fc9cd247b90eb9e97f6d3d3801754033329a1))
* **theposterdb:** open the matched set page — the search page has no posters ([4e1ad02](https://github.com/SaxxyToo/posterpilot/commit/4e1ad02e629b59faf036985c5a3b8c99cb4bccd9))
* **theposterdb:** open the matched set page — the search page has no posters ([9c485b3](https://github.com/SaxxyToo/posterpilot/commit/9c485b3f049e06c96e1ae249184e32a912bd7fc9))
* **theposterdb:** require the year to match when the wanted year is known ([8e87ea2](https://github.com/SaxxyToo/posterpilot/commit/8e87ea2a6482fe4cfae7818515c68a4660015147))
* tolerate transient reads and mislabeled bytes when applying artwork ([#85](https://github.com/SaxxyToo/posterpilot/issues/85)) ([7e5676b](https://github.com/SaxxyToo/posterpilot/commit/7e5676b660a9015052edd9db07d71bb6c71c809a))
* unblock Kometa and server-management edges the hardening left sharp ([#87](https://github.com/SaxxyToo/posterpilot/issues/87)) ([bbfc9a7](https://github.com/SaxxyToo/posterpilot/commit/bbfc9a76bd2402af043d39c8a62ec5086ceb2435))
* **unraid:** drop trailing colon from CA category and document store listing ([97d592d](https://github.com/SaxxyToo/posterpilot/commit/97d592dc72fb308f89729c8f3a94646cde09f471))
* **unraid:** fix CA category + document Community Apps store listing ([fc72204](https://github.com/SaxxyToo/posterpilot/commit/fc7220423a94b7cd9e97502190e9f80403e516ec))
* **update:** 1h TTL + stale-while-revalidate for the latest-release check ([e0984f0](https://github.com/SaxxyToo/posterpilot/commit/e0984f022372fd4e0449f94402764c591d8ae271))
* **update:** defer What's New until the check resolves; reword cache note ([3f2665e](https://github.com/SaxxyToo/posterpilot/commit/3f2665e7fa807f665de19d060e42b6fb8ebe29c6))
* **update:** only show What's New once the running version's notes resolve ([2bdd4cb](https://github.com/SaxxyToo/posterpilot/commit/2bdd4cbce8d03f714bcf5779c53efbc687cdf6ef))
* **update:** show running-version notes in What's New, re-check periodically ([2298885](https://github.com/SaxxyToo/posterpilot/commit/2298885b4d2983e75ae964ae4b7714bbc778d601))
* **update:** show running-version notes in What's New, re-check periodically ([c1d820c](https://github.com/SaxxyToo/posterpilot/commit/c1d820cd8c48661f8ded71d864ebc1b6331c67f9))
* use partial TMDB repair index ([a19bce3](https://github.com/SaxxyToo/posterpilot/commit/a19bce39f5ec7d09176c7da1a53a9fbfaa7d5722))
* use revisions for apply-and-next CAS ([7fef02c](https://github.com/SaxxyToo/posterpilot/commit/7fef02c4e20d713de0748f1488b3f85bb21deacd))
* **ux:** harden destructive actions, validation and a11y across surfaces ([6132e85](https://github.com/SaxxyToo/posterpilot/commit/6132e85a61f7bb836ca67c6ce24dbe0f17f9c2fc))
* **ux:** harden destructive actions, validation, a11y and i18n across surfaces ([b3a6915](https://github.com/SaxxyToo/posterpilot/commit/b3a69150ea9a46eed81fd237e421a9d6d5ea546d))
* **whats-new:** render release notes as markdown ([524c655](https://github.com/SaxxyToo/posterpilot/commit/524c6559eb2c352fcaf19d946b73d1ef91f09082))
* **whats-new:** render release notes as markdown ([bfc421a](https://github.com/SaxxyToo/posterpilot/commit/bfc421a8d10c3ba2135cb65cc7200c3e80664469))


### Under the hood

* add copyright, GitHub stars and app version to docs footer ([f68171c](https://github.com/SaxxyToo/posterpilot/commit/f68171c27640baefa5ec53e21bd898166a811bc5))
* add impeccable design context ([6295a65](https://github.com/SaxxyToo/posterpilot/commit/6295a651db9e0a38de60f9c6003716d258d60f1a))
* add impeccable design context ([d73ffdd](https://github.com/SaxxyToo/posterpilot/commit/d73ffdd01307047fd1948e0d4ec7d4f9c329bb8c))
* capture TMDB repair hardening ([1dffddb](https://github.com/SaxxyToo/posterpilot/commit/1dffddbf35e9700f7174738e8b7e4b31666fe560))
* complete TMDB repair hardening ([62a4173](https://github.com/SaxxyToo/posterpilot/commit/62a41733c1f1b45721e26061bb130eb3c0a8bedb))
* **config:** list French among the supported APP_LANGUAGE locales ([52bac90](https://github.com/SaxxyToo/posterpilot/commit/52bac90633a0083c8a1a53b4f9d886bd3432289b))
* cover ThePosterDB accounts, collection discovery, and apply flow ([73d915f](https://github.com/SaxxyToo/posterpilot/commit/73d915f30d64d84665ce0cc10d94f4ff70570a2a))
* cover ThePosterDB accounts, collection discovery, and apply flow ([feb93e7](https://github.com/SaxxyToo/posterpilot/commit/feb93e77334e735a65cabaff645cadc40fd4aa4d))
* document FUN section, watched sync, and library default sort ([670b949](https://github.com/SaxxyToo/posterpilot/commit/670b949a50a486f873faef1a607e1bf3e78e36d1))
* document product workflows and recovery ([dac72f4](https://github.com/SaxxyToo/posterpilot/commit/dac72f421f1b0eaef28d0ca8d60b30413cd75a1e))
* document the artwork workflow and refresh the screenshots ([#84](https://github.com/SaxxyToo/posterpilot/issues/84)) ([9345e83](https://github.com/SaxxyToo/posterpilot/commit/9345e832c119bd234cbeeae510cf788ce26ee613))
* draft OpenSpec changes for the remaining plan follow-ups ([08d7934](https://github.com/SaxxyToo/posterpilot/commit/08d7934bac38f6bdaa5399ef2ced53f5b7f2ffeb))
* extract SecuritySettings and LibrarySpotlight components ([70d0b8b](https://github.com/SaxxyToo/posterpilot/commit/70d0b8be491ebdf540f18900565b8baad130886a))
* **i18n:** translate the docs site (es/zh/ja/pt-BR) + disclaimer footer ([ed14c2e](https://github.com/SaxxyToo/posterpilot/commit/ed14c2e81eacc5eb268b6ed34b9c5097e7575631))
* **ia:** cache libraries+Refresh, Events→Settings Activity, Jobs→Dashboard ([91e9ecf](https://github.com/SaxxyToo/posterpilot/commit/91e9ecf8c363e604fd2550ef25638f78d96272dc))
* illustrate the new workflow guides with captured screenshots ([54c5473](https://github.com/SaxxyToo/posterpilot/commit/54c5473881a04873a99df93723f1228d5f976bf5))
* **kometa:** document the complete manager; drop KOMETA_METADATA_PATH ([cf084f8](https://github.com/SaxxyToo/posterpilot/commit/cf084f8c60ecf3726e6616e318dc84188e009e6d))
* **openspec:** add open-source-release change proposal ([54e6c62](https://github.com/SaxxyToo/posterpilot/commit/54e6c6212722660e924b3fede32d6541347e4388))
* **openspec:** draft i18n, multi-server, docs-site, poster-providers; expand OSS release ([3416254](https://github.com/SaxxyToo/posterpilot/commit/3416254221a6a0e46a00466ad83c4574256af41c))
* **openspec:** spec the complete Kometa manager (dedicated page + spotlight) ([9345560](https://github.com/SaxxyToo/posterpilot/commit/934556071a207a91803c25d6318608311cf7a552))
* plan artwork workflow issue resolution ([87cd64a](https://github.com/SaxxyToo/posterpilot/commit/87cd64acd6b150eee4b4dace4f27241495097154))
* **readme:** add Library + item-detail screenshots ([4d9ee5f](https://github.com/SaxxyToo/posterpilot/commit/4d9ee5f4560ce7cb6c61e7939e03e4962d9c482f))
* **readme:** reflect multi-server, providers, and i18n ([aa4de1e](https://github.com/SaxxyToo/posterpilot/commit/aa4de1ef7be7142f97b893e5e437762c5c0cdb9c))
* record docs-screenshots capture plan (blocked on a populated instance) ([4085298](https://github.com/SaxxyToo/posterpilot/commit/40852986b1601a55049fb1676d6827910ebe5eb7))
* refresh readme and documentation screenshots ([bc027a4](https://github.com/SaxxyToo/posterpilot/commit/bc027a4ff852c04d07e25308497d14a05391f540))
* refresh README and documentation screenshots ([f08c4c7](https://github.com/SaxxyToo/posterpilot/commit/f08c4c72cd6ba836ed802270c0b69e5975e1c008))
* refresh README screenshots and cover 0.11.0 features ([#94](https://github.com/SaxxyToo/posterpilot/issues/94)) ([9ad786b](https://github.com/SaxxyToo/posterpilot/commit/9ad786ba09c3b347232bce2d6fa533f3dbef7260))
* remove dead legacy apply path and unused exports ([4f42130](https://github.com/SaxxyToo/posterpilot/commit/4f42130da077bb7155125c9d6304c15e2b60ef6f))
* **safety:** document the one-click confirmation for warning-free plans ([cf70017](https://github.com/SaxxyToo/posterpilot/commit/cf70017ab253db4cffacae0b50a294be2f63ee81))
* **safety:** document the one-click confirmation for warning-free plans ([b52c3c5](https://github.com/SaxxyToo/posterpilot/commit/b52c3c5630d83049a591fad80afbd997e8369d6f))
* **site:** Astro Starlight documentation site + GitHub Pages deploy ([968231d](https://github.com/SaxxyToo/posterpilot/commit/968231de29199f147cc46bcccb2589bc84284ba8))
* sync README + 5-language docs to current feature set ([3800b01](https://github.com/SaxxyToo/posterpilot/commit/3800b01a8cd9cccb6949ff94793a98d5409c1dd1))
* unify duplicated Plex poster/background upload code ([39cb3fa](https://github.com/SaxxyToo/posterpilot/commit/39cb3fae0ebb6bc33499d898bc766d3cc4a4c977))
* write 0.11.0 release notes ([#89](https://github.com/SaxxyToo/posterpilot/issues/89)) ([8816455](https://github.com/SaxxyToo/posterpilot/commit/88164553bf1ce73ef7b7b339ab3bf624b2c7d67c))
* write 0.12.0 release notes ([#96](https://github.com/SaxxyToo/posterpilot/issues/96)) ([3d712b4](https://github.com/SaxxyToo/posterpilot/commit/3d712b40f06440d8e292863daf93bbba702f6a16))
* write 0.12.2 release notes ([2790415](https://github.com/SaxxyToo/posterpilot/commit/2790415c737c1ba78b6777656961d88781feba29))
* write 0.13.0 release notes ([#113](https://github.com/SaxxyToo/posterpilot/issues/113)) ([07ecaf3](https://github.com/SaxxyToo/posterpilot/commit/07ecaf3ca7f35fa2c631aa3fcee154b8d1a05444))
* write 0.13.1 release notes ([#118](https://github.com/SaxxyToo/posterpilot/issues/118)) ([ae616f3](https://github.com/SaxxyToo/posterpilot/commit/ae616f38cf99e70d2e351c529248bc4bed35f64d))
* write 0.14.0 release notes ([#129](https://github.com/SaxxyToo/posterpilot/issues/129)) ([177a2fe](https://github.com/SaxxyToo/posterpilot/commit/177a2febbea19efd72604afe9ea6c780eecbffac))

## [0.14.0](https://github.com/diegopeixoto/posterpilot/compare/v0.13.1...v0.14.0) (2026-11-02)

Pick a poster language title by title, keep Jellyfin and Emby from overwriting the artwork you applied, and a tidier library on phones.

### Features

* **Pick an artwork language per title, right in the poster picker.** The language toggle on an item page is now a picker: your saved preference (the default, unchanged), **All languages**, or any language this title's covers are actually tagged in, with a count for each (`Dansk (12)`). The pick filters **Fanart.tv as well as TMDB**; MediUX, ThePosterDB and textless artwork always stay visible. It only lasts for that page and never touches your global setting, and when nothing exists in the picked language the page says so instead of just showing a shorter grid. Languages outside the curated list are now named in their own language instead of a bare code. ([#125](https://github.com/diegopeixoto/posterpilot/pull/125))
* **Jellyfin and Emby can now lock the artwork you apply.** A library refresh that downloads images could replace what PosterPilot had just applied. A new setting, **Lock artwork applied on Jellyfin/Emby** (`JELLYFIN_ITEM_LOCK`, under Settings → Kometa & advanced), sets Jellyfin's `LockData` on apply. It is **off by default** because Jellyfin locks the whole item, not one image: it also stops that item's metadata refreshes and cascades from a show to its seasons and episodes. A "Replace all images" refresh started in Jellyfin still overrides it. ([#126](https://github.com/diegopeixoto/posterpilot/pull/126))
* **A tidier library toolbar, and controls sized for touch.** The library's search, filters, sort, ignore view and artwork coverage now sit in one row, with the selection actions at the far end; on a phone the search takes the full width. On touch screens, standard buttons and form fields are at least 44px tall. On an item page, empty poster and backdrop slots in the apply bar are drawn as outlines, and the custom URL/upload panel no longer covers the apply bar on phones. ([#128](https://github.com/diegopeixoto/posterpilot/pull/128))

### Bug Fixes

* **Plex locks the applied field again.** An earlier rework of the apply pipeline stopped locking the poster or background field after an apply, on every server, so a Plex metadata refresh could put the agent's artwork back. Applying on Plex now locks just the field it changed, as it used to. ([#126](https://github.com/diegopeixoto/posterpilot/pull/126))
* **Undo only unlocks what PosterPilot locked.** PosterPilot now records each lock it takes, and undo releases only those. A lock you set yourself is never cleared, undoing a replacement keeps the earlier PosterPilot artwork it restores locked, and undoing a poster no longer unprotects a backdrop PosterPilot still owns. If locking fails, the artwork change is still recorded as it happened and the failure is logged as a warning. ([#126](https://github.com/diegopeixoto/posterpilot/pull/126))

### Upgrading

* One database migration (`0013`) adds an `artwork_field_locks` table. It only adds a table, so rolling back to 0.13.1 leaves it unused.
* Jellyfin/Emby locking stays off until you turn it on. Applies made before this release have no lock record, so undoing them leaves any lock they set in place.

### Contributors

* [@SaxxyToo](https://github.com/SaxxyToo) asked for Jellyfin/Emby locking in [#121](https://github.com/diegopeixoto/posterpilot/issues/121) and built it in [#122](https://github.com/diegopeixoto/posterpilot/pull/122), which [#126](https://github.com/diegopeixoto/posterpilot/pull/126) carries forward with their authorship. The Jellyfin research is theirs, and so is the catch that applies had stopped locking fields on Plex too.
* [@LoveMyslf-1](https://github.com/LoveMyslf-1) asked for the per-title language picker in [#124](https://github.com/diegopeixoto/posterpilot/issues/124), down to Fanart.tv support and an explicit empty state, which is how it shipped.

## [0.13.1](https://github.com/diegopeixoto/posterpilot/compare/v0.13.0...v0.13.1) (2026-08-22)

One fix, for the minute right after an upgrade: a tab you left open now notices the new release by itself.

### Bug Fixes

* **A tab left open across an upgrade no longer keeps running the old release.** A tab that was open when the container was replaced kept the previous client code for as long as it stayed open. Everything the server sends still refreshed — the version in the footer included — so the page looked current while its buttons and flows were the old ones. That is how an install already on 0.12.2 could still show the last item of a review run without **Apply and finish**. PosterPilot now checks once a minute whether the build it loaded is still the one serving, and the first click after an upgrade becomes a full page load of the same page, on the new code. No banner, nothing to dismiss. ([#116](https://github.com/diegopeixoto/posterpilot/pull/116))

### Upgrading

* No database migrations, no configuration changes.
* One last time by hand: tabs that are open during *this* upgrade are still running 0.13.0 or earlier, which does not have the check, so reload them once after the container restarts. From 0.13.1 onward that happens on its own.

### Contributors

* [@lishremix](https://github.com/lishremix) followed up on [#100](https://github.com/diegopeixoto/posterpilot/issues/100) with a screenshot that should not have been possible — a 0.12.2 footer over a page still missing the 0.12.2 button — and a week later reported it had stopped happening, which is exactly what a tab that finally got reloaded looks like. That is what exposed the stale tab ([#115](https://github.com/diegopeixoto/posterpilot/issues/115)).

## [0.13.0](https://github.com/diegopeixoto/posterpilot/compare/v0.12.2...v0.13.0) (2026-08-13)

### Features

* Appearance is now fully themeable. Choose from eleven built-in themes — including full Overseerr, Sonarr/Radarr and Terminal reskins — with live previews, accessible contrast, accent/background/radius overrides, and top or left navigation where the theme permits it. The original PosterPilot look remains the default. ([#110](https://github.com/diegopeixoto/posterpilot/pull/110))
* Create a theme from the current appearance, edit it, and export or import a versioned `.posterpilot-theme.json` file. Imported CSS is disclosed before activation and validated so escaped spellings cannot hide remote fonts, images, stylesheets or imports. ([#110](https://github.com/diegopeixoto/posterpilot/pull/110))
* Operators can now distinguish a live process from a usable database with `GET /api/ready`, while `/api/health` stays lightweight. Support bundles also include bounded, sanitized SQLite, WAL, filesystem and recent job-attempt diagnostics without exporting the database path, secrets or raw settings. ([#108](https://github.com/diegopeixoto/posterpilot/pull/108), [#109](https://github.com/diegopeixoto/posterpilot/pull/109))

### Upgrading

* No database migration or configuration change is required. Existing installations keep the original PosterPilot theme until another theme is selected. ([#110](https://github.com/diegopeixoto/posterpilot/pull/110))

## [0.12.2](https://github.com/diegopeixoto/posterpilot/compare/v0.12.1...v0.12.2) (2026-08-11)

Two fixes for work that quietly did not finish: a review list that could never be emptied, and a sync that gave up on a whole library because of one title.

### Bug Fixes

* **The last title in a review run can finally be completed.** Working a library down with **Apply and next** left every library permanently reporting one outstanding title, because the last item had no next item and therefore no completing button — only a plain **Apply**, which writes the artwork but never records the review. There was no way to finish it, and no setting that would have helped. The last item now offers **Apply and finish**, which applies, records the review, and returns to the list you came from. ([#101](https://github.com/diegopeixoto/posterpilot/pull/101))
* **One unwritable title no longer abandons the rest of the sync.** A failure while writing a single item — a contended write, a dropped connection, a row the database refused — escaped the loop and ended the entire run, discarding every title after it and reporting the whole sync as one failure. Each item is now isolated: the failure is recorded against that title and the sync carries on. On a ten-title library with one bad entry, that is the difference between two titles synced and nine. A long run of consecutive failures still fails the attempt, because that is the database or the media server rather than the titles, and the job's own retry is the right answer. ([#104](https://github.com/diegopeixoto/posterpilot/pull/104))

### Upgrading

* No database migrations, no configuration changes.

### Still open

* [#91](https://github.com/diegopeixoto/posterpilot/issues/91) remains open. A first sync on a large library can still fail to persist anything; the investigation is ongoing and this release does not address it.

### Contributors

* [@lishremix](https://github.com/lishremix) reported [#100](https://github.com/diegopeixoto/posterpilot/issues/100), noticing that a library always kept one actionable title no matter how much work was done, and saying plainly that they had looked for a way to finalize it and found none. There wasn't one — that was the bug.

## [0.12.1](https://github.com/diegopeixoto/posterpilot/compare/v0.12.0...v0.12.1) (2026-08-10)


### Bug Fixes

* log the cause chain on request errors and retry transient open failures ([#98](https://github.com/diegopeixoto/posterpilot/issues/98)) ([dd28466](https://github.com/diegopeixoto/posterpilot/commit/dd284663a379d387772d24600e068e3afe863cfe))


### Under the hood

* write 0.12.0 release notes ([#96](https://github.com/diegopeixoto/posterpilot/issues/96)) ([3d712b4](https://github.com/diegopeixoto/posterpilot/commit/3d712b40f06440d8e292863daf93bbba702f6a16))

## [0.12.0](https://github.com/diegopeixoto/posterpilot/compare/v0.11.0...v0.12.0) (2026-08-10)

Two things that stopped people cold: a first sync that never finished on a large library, and a migration banner that told you to fix something your config never had.

### Features

* **The Kometa migration banner now names what is actually blocking it.** It used to print one generic error suggesting you remove YAML aliases and merge keys — often from a config containing neither — while the real obstacles were computed and then discarded. Every obstacle is now listed against the library it belongs to: a `libraries:` key matching no synced section comes with a suggestion drawn from your actual section titles (`"Documentarios" does not match any synced section. Similar synced sections: Documentários Filmes, Documentarios Seriados.`), and conflicting types, unsupported types, unowned references and unclassifiable entries each say what they are, in all six languages. The same legacy file listed twice under `metadata_files` is now a fix rather than a dead end: repeats that are provably the same file are collapsed to one entry, while two *different* paths are never merged silently — they are proposed for removal, listed exactly as written, behind their own confirmation checkbox. ([#93](https://github.com/diegopeixoto/posterpilot/pull/93))

### Bug Fixes

* **A large library no longer makes the first sync impossible.** On a Plex section big enough that reading it takes ~30 seconds, every read was abandoned at 20 seconds and retried, three attempts stacking into a 125-second failure that could never have succeeded — no attempt was ever allowed to outlive the server's real response. Library reads now get a 120-second budget per attempt on Plex, Jellyfin and Emby, so a section that answers in half a minute succeeds on the first try. ([#92](https://github.com/diegopeixoto/posterpilot/pull/92))
* **A sync can no longer sit in `running` forever.** A task that hung stayed alive: the heartbeat renewed its lease on a timer whether or not the work advanced, so the lease never expired, recovery never fired, and the only cure was restarting the container. Fifteen minutes with no observable progress now fails the attempt through the normal retry path and stops the abandoned task at its next checkpoint. ([#92](https://github.com/diegopeixoto/posterpilot/pull/92))
* **A retried job no longer shows the previous attempt's error.** A job that was re-claimed kept the old failure text in its row, so a healthy retry looked like a wedged worker. The failure now stays on the attempt it belongs to. ([#92](https://github.com/diegopeixoto/posterpilot/pull/92))

### Under the hood

* The README now shows what the app actually does — four screenshots taken from a populated library instead of two, covering the enlarged preview and artwork coverage — and its screenshots are refreshed by the same one command as the documentation images rather than by hand. The 0.11.0 release notes were also written into `CHANGELOG.md`. ([#89](https://github.com/diegopeixoto/posterpilot/pull/89), [#94](https://github.com/diegopeixoto/posterpilot/pull/94))

### Upgrading

* No database migrations and no configuration changes.
* Library reads now wait up to 120 seconds per attempt instead of 20. A genuinely unreachable server therefore takes longer to report failure than it did before — that is the trade for large libraries being able to sync at all. These reads only happen inside background jobs, never while you are waiting on a page.

### Contributors

* [@ThibaultTourailles](https://github.com/ThibaultTourailles) reported [#91](https://github.com/diegopeixoto/posterpilot/issues/91) with the kind of detail that made it fixable rather than guessable: `curl` timings taken independently of the app, the same failure isolated to a single 3,054-item section, and the observation that the 125-second failures landed on the second every time. Both halves of that report — the stacked retries and the job stuck in `running` — are fixed here.

## [0.11.0](https://github.com/diegopeixoto/posterpilot/compare/v0.10.0...v0.11.0) (2026-08-10)

Every feature and fix below started as an issue from one person. This release is the answer to all eight of them.

### Features

* **Kometa files split by media type** — generated metadata is now `posterpilot-movies.yml` and `posterpilot-shows.yml`, each destination resolved from the media server's authoritative kind (TMDB for movies, TVDB for shows, canonical IMDb as fallback), with numeric mappings emitted as YAML integers the way Kometa 2.x expects. A movie and a show sharing a number can no longer collide. A guided migration moves your existing `posterpilot.yml` across: it previews what it found, classifies entries from real evidence rather than guessing, backs up every target plus `config.yml`, activates the configuration last, and can be resumed, cancelled or rolled back at any point — the legacy file is never deleted. ([#73](https://github.com/diegopeixoto/posterpilot/pull/73), [#74](https://github.com/diegopeixoto/posterpilot/pull/74))
* **Preferred artwork language** — pick a TMDB artwork language in Settings → Providers, independent of the interface language, or let it follow the UI. Artwork TMDB marks as textless always stays available, so a preference never empties a pane of perfectly good posters, and a foreign-language poster is used only when nothing preferred exists — labelled when it happens. Each item also has an on-the-fly Preferred/All switch that leaves your global setting alone. Discovery keeps every language regardless, so changing the preference re-filters instantly instead of re-searching. ([#79](https://github.com/diegopeixoto/posterpilot/pull/79))
* **The whole poster inventory, not the first twenty** — TMDB results were capped at 20 per artwork kind, posters and backdrops counted separately, which is where "capped at 40" came from. Ingestion now validates, de-duplicates and keeps far more, and each pane has a **load more** control reporting how many remain. Posters and backdrops load independently, and candidates you have not revealed do not download their images. ([#79](https://github.com/diegopeixoto/posterpilot/pull/79))
* **Enlarge any candidate** — every tile has its own ⤢ control that opens the full-size artwork uncropped, with its provider, dimensions and language, and previous/next through the candidates currently on screen. It never stages anything: opening, browsing and closing leaves your staged artwork exactly as it was. Works with mouse, keyboard and touch, and returns focus to the button you opened it from. ([#81](https://github.com/diegopeixoto/posterpilot/pull/81))
* **Artwork coverage** — the library, review and item views now report what is actually in place, per destination and per artwork slot, and both lists can be filtered by it — including **needs artwork**. Crucially, a Kometa export says exactly that and never claims artwork was applied: writing a YAML entry proves nothing about what your media server is serving. Artwork replaced outside PosterPilot gets its own state instead of looking like it was never applied, and evidence we could not verify is never reported as absence. ([#82](https://github.com/diegopeixoto/posterpilot/pull/82), [#83](https://github.com/diegopeixoto/posterpilot/pull/83))
* **Provider order you control** — the order providers appear in was really the order their searches happened to finish. It is now the order you set in Settings → Providers, by drag handle or move buttons, and it decides which provider is presented first and breaks ties between equal scores — never overriding a better-scoring cover from further down the list. Disabled providers keep their place. ([#80](https://github.com/diegopeixoto/posterpilot/pull/80))

### Bug Fixes

* TV libraries were matched against TMDB as movies on first sync, so shows resolved to whatever film shared their id — and the wrong artwork followed. Automatic matching now resolves only inside the media server's authoritative movie or TV namespace. Existing installs get a banner offering a targeted repair of just the affected titles, rather than requiring a full rescan. ([#69](https://github.com/diegopeixoto/posterpilot/pull/69))
* Manual TMDB search stopped working after editing the year field, because a partially typed year left the form in an unrecoverable state. Year handling is numeric-or-empty now, and search failures are recoverable instead of terminal. ([#69](https://github.com/diegopeixoto/posterpilot/pull/69))
* Downscaled preview images were written into Kometa metadata instead of the full-resolution asset. Grids browse optimized previews, but what gets applied to your server and written to Kometa is now the canonical original, verified byte-for-byte. ([#72](https://github.com/diegopeixoto/posterpilot/pull/72))
* Staged selections could be lost when discovery re-ran underneath them, and an apply could write over artwork it had not actually verified. Selections now survive rediscovery, and a write refuses when the destination could not be read at all. ([#72](https://github.com/diegopeixoto/posterpilot/pull/72), [#85](https://github.com/diegopeixoto/posterpilot/pull/85))
* Images served with a missing or unusual `Content-Type` — common on home servers and S3-compatible storage — were rejected outright. The declared type is still trusted when it is a known image type; anything else is identified from the file's own bytes. ([#85](https://github.com/diegopeixoto/posterpilot/pull/85))

### Under the hood

* A component test layer running in a real browser, alongside the existing unit and end-to-end suites, because focus handling, live regions and pointer capture are exactly what an emulated DOM models least faithfully. It has already caught two focus bugs that unit tests could not see. ([#80](https://github.com/diegopeixoto/posterpilot/pull/80), [#83](https://github.com/diegopeixoto/posterpilot/pull/83))
* Documentation for everything above in all six languages, and every documentation screenshot is now reproducible from one command instead of being captured by hand. ([#84](https://github.com/diegopeixoto/posterpilot/pull/84))
* Kometa metadata with a hand-edited typo in a slot value no longer fails every export and apply for that entry, collection discovery survives a member deleted mid-request, and TMDB ids filed under the other namespace resolve again. ([#86](https://github.com/diegopeixoto/posterpilot/pull/86), [#87](https://github.com/diegopeixoto/posterpilot/pull/87))

### Upgrading

* **Back up your `data/` directory before upgrading.** Four database migrations run on first start. They are additive — nothing is rewritten or deleted — but there is no downgrade path.
* **Kometa users: your metadata moves to two files.** `posterpilot.yml` is replaced by `posterpilot-movies.yml` and `posterpilot-shows.yml`. The migration is guided and reversible, it backs up your existing files and `config.yml` first, and it never deletes the legacy file. Nothing changes until you run it.
* Artwork coverage starts empty and fills in as titles are synced, applied, or opened — the upgrade deliberately does not guess coverage for artwork applied before it existed.
* No configuration is required. The new artwork-language preference defaults to every language, which is exactly how browsing behaved before.

### Contributors

This release exists because of [@lishremix](https://github.com/lishremix), who filed all eight issues it closes — and did both halves of the work that makes an issue useful.

**Found the bugs**, with enough detail to reproduce them:

* TV libraries resolving against TMDB as movies on first sync, which quietly attached the wrong artwork to entire show libraries ([#64](https://github.com/diegopeixoto/posterpilot/issues/64))
* manual TMDB search dying after the year field was edited ([#61](https://github.com/diegopeixoto/posterpilot/issues/61))
* downscaled preview images being written into Kometa metadata instead of the full-size asset ([#63](https://github.com/diegopeixoto/posterpilot/issues/63))

**Asked for the features**, and framed them well enough to shape how they were built:

* a preferred TMDB artwork language, including the "unless there is no poster in my language" exception that became the labelled fallback ([#62](https://github.com/diegopeixoto/posterpilot/issues/62))
* more than the first page of TMDB results — and the observation that the cap hurt *because* language could not be filtered, which is why both shipped together ([#68](https://github.com/diegopeixoto/posterpilot/issues/68))
* splitting Kometa metadata by media type ([#66](https://github.com/diegopeixoto/posterpilot/issues/66))
* a quick way to enlarge a poster before choosing it ([#65](https://github.com/diegopeixoto/posterpilot/issues/65))
* somewhere to see what artwork has actually been set across servers and libraries ([#67](https://github.com/diegopeixoto/posterpilot/issues/67))

## [0.10.0](https://github.com/diegopeixoto/posterpilot/compare/v0.9.0...v0.10.0) (2026-07-26)

This is the first PosterPilot release built with the community — every Jellyfin fix
below started as a contributed PR, and a substantial share of the features were
upstreamed from the [Bubu31/posterpilot](https://github.com/Bubu31/posterpilot) fork.

### Features

* **ThePosterDB, properly** — optional account sign-in (the site serves placeholder images to anonymous visitors; credentials are encrypted at rest and never required), real contributor sets with author attribution, and the group expanded by default on the item page. For collections, PosterPilot now finds ThePosterDB's own collection sets and matches them onto your members as one coordinated design. ([#48](https://github.com/diegopeixoto/posterpilot/pull/48), [#52](https://github.com/diegopeixoto/posterpilot/pull/52), [#53](https://github.com/diegopeixoto/posterpilot/pull/53))
* **Re-search on demand** — a per-provider ⟳ button on every item's provider group, and a whole-collection re-search that reports how many members succeeded. Each provider also keeps a reserved share of the candidate list, so one high-scoring source can't crowd the others out. ([#50](https://github.com/diegopeixoto/posterpilot/pull/50), [#52](https://github.com/diegopeixoto/posterpilot/pull/52))
* **One-click apply** — a single-item plan with nothing skipped applies in the same click. Any plan carrying a skip, and the apply-and-next flow, keep the confirmation dialog; the server-side preview/confirm contract is unchanged. ([#49](https://github.com/diegopeixoto/posterpilot/pull/49), [#51](https://github.com/diegopeixoto/posterpilot/pull/51))
* **French** — the sixth UI language, across the whole app and the documentation site. ([#54](https://github.com/diegopeixoto/posterpilot/pull/54))
* **Credits where due** — the app and docs footers now carry the version, maintainer, and Aquarela links. ([#47](https://github.com/diegopeixoto/posterpilot/pull/47))

### Bug Fixes

* Applying artwork on Jellyfin 10.11.x failed with a generic error: the server dropped the single-item metadata endpoint. Artwork reads now use the list form 10.11 still serves. ([#38](https://github.com/diegopeixoto/posterpilot/pull/38))
* Jellyfin backdrops were appended behind the existing one, so applies "succeeded" while the visible art never changed. Existing backdrops are now cleared first — order-safely, since Jellyfin's tag order does not match its delete index. ([#40](https://github.com/diegopeixoto/posterpilot/pull/40))
* Merged-version movies appeared two or three times, library extras leaked in as movies, and watched state never arrived. The library — and collections, seasons, and episodes — are now read through the same user-scoped view the Jellyfin UI uses, resolved once per snapshot so mixed reads can't corrupt collection membership. ([#41](https://github.com/diegopeixoto/posterpilot/pull/41), [#45](https://github.com/diegopeixoto/posterpilot/pull/45))
* ThePosterDB discovery always returned nothing: the search page contains no poster images. The matching set page is now opened instead, chosen by strict title *and* year so a remake never gets the wrong film's artwork. ([#42](https://github.com/diegopeixoto/posterpilot/pull/42))
* Even then, every ThePosterDB apply was silently dropped: the site's image CDN wasn't on the trusted-host list. ([#48](https://github.com/diegopeixoto/posterpilot/pull/48))
* Concurrent provider discovery could fail with "database is locked". The database now runs in WAL mode and every discovery write goes through a single write queue. ([#50](https://github.com/diegopeixoto/posterpilot/pull/50), [#53](https://github.com/diegopeixoto/posterpilot/pull/53))
* Candidates from a provider you disabled (or whose credential is gone) no longer appear on the item page; re-enabling brings them back without re-searching. ([#50](https://github.com/diegopeixoto/posterpilot/pull/50))
* The documentation site had failed to build since the Astro 7 upgrade; docs deploys work again. ([#47](https://github.com/diegopeixoto/posterpilot/pull/47))
* Reads could briefly fail with a flashing error while a large sync was writing: reads now retry bounded on database contention, complementing the write queue. ([#58](https://github.com/diegopeixoto/posterpilot/pull/58))
* A stored ThePosterDB password could not be removed from the settings page; a clear control now deletes it on save and returns the provider to anonymous mode. ([#59](https://github.com/diegopeixoto/posterpilot/pull/59))

### Under the hood

* Every new feature is documented — ThePosterDB accounts, collection discovery, re-search, and the one-click contract — in all six languages. ([#51](https://github.com/diegopeixoto/posterpilot/pull/51), [#55](https://github.com/diegopeixoto/posterpilot/pull/55))
* Docs toolchain moved to Astro 7. ([#39](https://github.com/diegopeixoto/posterpilot/pull/39), [#43](https://github.com/diegopeixoto/posterpilot/pull/43))

### Upgrading

* No database migration. WAL mode is applied automatically and is reversible; ThePosterDB credentials are optional and everything works anonymously as before.

### Contributors

* [@nasspium](https://github.com/nasspium) — the entire Jellyfin 10.11 compatibility series and the ThePosterDB set-page fix ([#38](https://github.com/diegopeixoto/posterpilot/pull/38), [#40](https://github.com/diegopeixoto/posterpilot/pull/40), [#41](https://github.com/diegopeixoto/posterpilot/pull/41), [#42](https://github.com/diegopeixoto/posterpilot/pull/42)), each verified against a live server.
* [@Bubu31](https://github.com/Bubu31) (with [@LeGrosBubu](https://github.com/LeGrosBubu)) — ThePosterDB accounts, real sets and collection matching, discovery stability, one-click apply, disabled-provider filtering, and the CDN trust fix, upstreamed from their fork with co-authorship ([#48](https://github.com/diegopeixoto/posterpilot/pull/48)–[#53](https://github.com/diegopeixoto/posterpilot/pull/53)). They also independently found and fixed the Jellyfin bugs above.

## [0.9.0](https://github.com/diegopeixoto/posterpilot/compare/v0.8.0...v0.9.0) (2026-07-13)


### Features

* **Multiple media servers** — name, test, and switch between Plex, Jellyfin, and Emby servers without mixing their libraries or credentials. The existing connection is carried over automatically as a protected default server, so nothing changes until you add a second one. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* **Review inbox** — one queue for everything that needs a decision: unresolved titles, ready suggestions, staged artwork, partial failures, and titles changed on the server. Saved views, manual TMDB matching with an audit trail, and apply-and-next to work straight through. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* **Exact previews, verification, and undo** — every artwork write shows the precise plan first (uploads, Kometa exports, skips), executes only what was confirmed, verifies each destination afterwards, and records a revision per slot. Anything applied can be undone from the artwork timeline — a slot, a season, one revision, or the whole item — restoring the byte-exact artwork that was there before. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* **Collections** — coordinate a collection's own artwork with its members', apply the family as one job, and undo the whole group together. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* **Automation that never applies on its own** — run sync and discovery on an interval, at a time of day, or on a media event, and route the results to the review inbox. Automations are review-only by design: they queue decisions, they never write artwork. Inbound webhooks with one-time tokens included. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* **Backups and recovery** — create, verify, and export application backups. A restore runs a full safety preflight (integrity, schema compatibility, disk space, encryption key), keeps a protected pre-restore safety backup, and stages the swap for the next restart with automatic rollback if readiness checks fail. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* **FUN** — filtered random picks, blind reveal, poster match, an ambient full-screen gallery, and a session planner that fits the available time. All read-only: FUN never applies artwork. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))


### Bug Fixes

* Automations scoped to a library never fired when a sync added new items to more than one library — the event carried ids from every library, and the scoped schedule silently rejected them. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* Changes made after confirming a restore, while the app awaited its restart, were accepted and then discarded by the restore. Writes are now rejected for that window, and every page says why. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* Jellyfin, Emby, and plex.tv requests could hang indefinitely against a stalled server. Every call now has a timeout. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* The review inbox pulled keyboard focus back to the previous card after each action. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))


### Under the hood

* Durable jobs with lease-based crash recovery — undo runs on the queue too, so a large collection undo reports progress and survives a restart. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))
* Diagnostics and support bundles with fail-closed secret redaction, an isolated Playwright suite covering setup through authentication, and reproducible documentation screenshots. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))


### Upgrading

* This release ships a substantial database migration that creates the multi-server, revision, automation, and backup storage, and re-scopes existing media, jobs, and candidates onto the carried-over server. It runs in a single transaction and rolls back cleanly on failure, but back up the `data/` directory before upgrading — there is no downgrade path. ([#35](https://github.com/diegopeixoto/posterpilot/pull/35))

## [0.8.0](https://github.com/diegopeixoto/posterpilot/compare/v0.7.0...v0.8.0) (2026-07-07)


### Features

* **Optional login** — require a username and password to reach PosterPilot, *arr-style: off by default, or on except for local-network addresses. Signed sessions, an `AUTH_MODE` env override that recovers a locked-out instance, and fail-closed handling behind a reverse proxy. Enabling it is non-breaking — existing installs are untouched until you opt in. ([#30](https://github.com/diegopeixoto/posterpilot/pull/30))
* **Faster large libraries** — the library wall now loads a page at a time and fills in as you scroll instead of shipping every title in one payload, and posters are served through a cached, grid-sized thumbnail proxy, so browsing a big library is far snappier. ([#30](https://github.com/diegopeixoto/posterpilot/pull/30))
* **Clearer feedback** — toast notifications for saves and actions, plus skeleton placeholders while the grid loads. ([#30](https://github.com/diegopeixoto/posterpilot/pull/30))
* **Safer by default** — custom-poster uploads are validated by content and size, every response carries baseline security headers, outbound requests honor provider rate limits (`Retry-After`), and authentication events are logged (never the password). ([#30](https://github.com/diegopeixoto/posterpilot/pull/30))


### Under the hood

* Added an ESLint gate, more test coverage (Kometa catalogs), de-duplicated Plex upload code, and began splitting the settings/library pages into components. ([#30](https://github.com/diegopeixoto/posterpilot/pull/30))

## [0.7.0](https://github.com/diegopeixoto/posterpilot/compare/v0.6.0...v0.7.0) (2026-07-02)


### Features

* fun menu with random picker + date-added library sort ([6dc1a83](https://github.com/diegopeixoto/posterpilot/commit/6dc1a83278b610e1284e361c102c0f8be6e4abb7))
* FUN menu with random picker + date-added library sort ([cc96b32](https://github.com/diegopeixoto/posterpilot/commit/cc96b3202a5e4069146f5f7d56e5ee203a39fb5f))


### Bug Fixes

* sort-state drift and shared sort module from self-review ([3f5c86f](https://github.com/diegopeixoto/posterpilot/commit/3f5c86f5e492624f4636381656a4da9e102fd3c8))

## [0.6.0](https://github.com/diegopeixoto/posterpilot/compare/v0.5.0...v0.6.0) (2026-06-28)


### Features

* **Sign in without token hunting** — log in to Jellyfin/Emby with a username and password, or to Plex with a "Login with Plex" button; pasting a token/API key still works as a fallback. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))
* **Encrypted secrets at rest** — media-server tokens and provider API keys are encrypted (AES-256-GCM) with a key the app generates automatically; existing installs keep working and migrate on the next save. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))
* **Suggested artwork** — candidates are scored (provider, resolution, aspect) and the best is pre-selected for the show and each season/episode as an overridable suggestion you can turn off. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))
* **Dry-run preview** — see exactly what a single or bulk apply would upload, export, and skip before committing. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))
* **Ignore list** — mark items to leave untouched; they're skipped by discovery, apply, and auto-select, and filterable in the library. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))
* **Faster libraries** — incremental sync skips items unchanged on the server, and bulk apply runs with bounded concurrency. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))
* **Thumbnail cache** — provider preview images are cached on disk and served through a proxy for snappier browsing. ([#23](https://github.com/diegopeixoto/posterpilot/pull/23))

## [0.5.0](https://github.com/diegopeixoto/posterpilot/compare/v0.4.1...v0.5.0) (2026-06-28)


### Features

* granular season/episode artwork + collapsible artwork sections ([3be1b04](https://github.com/diegopeixoto/posterpilot/commit/3be1b045ea63d6ce29fd2871f14a2f3f87bb5a94))
* granular season/episode artwork + collapsible artwork sections ([193b12d](https://github.com/diegopeixoto/posterpilot/commit/193b12d98cac3d59a789c30f755d650eca413581))


### Bug Fixes

* **poster:** address PR [#20](https://github.com/diegopeixoto/posterpilot/issues/20) review (Copilot + Codex) ([7d2fc74](https://github.com/diegopeixoto/posterpilot/commit/7d2fc74b589679dc711a1b3b0c9179685dd725a2))

## [0.4.1](https://github.com/diegopeixoto/posterpilot/compare/v0.4.0...v0.4.1) (2026-06-27)


### Bug Fixes

* **kometa:** address [#16](https://github.com/diegopeixoto/posterpilot/issues/16) review + archive openspec changes ([f80f6b9](https://github.com/diegopeixoto/posterpilot/commit/f80f6b91ca01007557b7072254663279143b698f))
* **kometa:** address PR [#16](https://github.com/diegopeixoto/posterpilot/issues/16) review ([664e2cb](https://github.com/diegopeixoto/posterpilot/commit/664e2cb699c16cc52970e27bcbaec644ae8ebe83))
* **kometa:** address PR [#18](https://github.com/diegopeixoto/posterpilot/issues/18) review ([7b71198](https://github.com/diegopeixoto/posterpilot/commit/7b7119845d43a07f3ab05e79bb33ef7c20a632af))

## [0.4.0](https://github.com/diegopeixoto/posterpilot/compare/v0.3.2...v0.4.0) (2026-06-26)


### Features

* Kometa manager — manage Kometa's config.yml from a dedicated page ([26782e1](https://github.com/diegopeixoto/posterpilot/commit/26782e12e7c8575fe6ad5880e27ec891912e8c5d))
* **kometa:** co-locate posterpilot.yml with config.yml + config readers/backups ([e458099](https://github.com/diegopeixoto/posterpilot/commit/e4580991ba5555e402178e0a5a5d1d5ad4c2e04b))
* **kometa:** dedicated /kometa manager page with spotlight hero ([69c6ca7](https://github.com/diegopeixoto/posterpilot/commit/69c6ca7f84b6c361a70a37cc1cc12a4dcaa9aab1))
* **kometa:** enrich catalogs from the manual — full sets, descriptions, enums ([1ea724e](https://github.com/diegopeixoto/posterpilot/commit/1ea724ea49a557f1504454cab4bc2455bec0e2d9))
* **kometa:** full orchestration — connectors, overlays, operations, raw, backups ([aeee6c6](https://github.com/diegopeixoto/posterpilot/commit/aeee6c6b77a80d9ccf2b51c8ff5cdeb1fc816264))
* **kometa:** generalize merge engine + connector/overlay/operation catalogs ([a324bcc](https://github.com/diegopeixoto/posterpilot/commit/a324bcc46f1d00f4acfe80d820b15d2bff4a89ae))
* **kometa:** move management off the Settings tab to /kometa; i18n parity ([b76aaf2](https://github.com/diegopeixoto/posterpilot/commit/b76aaf2c064df06d63d407484264100acafe4083))
* manage Kometa config.yml from a new settings tab ([b0db76f](https://github.com/diegopeixoto/posterpilot/commit/b0db76f834a1ff4d27e7b082242fe58f154a0813))

## [0.3.2](https://github.com/diegopeixoto/posterpilot/compare/v0.3.1...v0.3.2) (2026-06-24)


### Bug Fixes

* **unraid:** drop trailing colon from CA category and document store listing ([97d592d](https://github.com/diegopeixoto/posterpilot/commit/97d592dc72fb308f89729c8f3a94646cde09f471))
* **unraid:** fix CA category + document Community Apps store listing ([fc72204](https://github.com/diegopeixoto/posterpilot/commit/fc7220423a94b7cd9e97502190e9f80403e516ec))

## [0.3.1](https://github.com/diegopeixoto/posterpilot/compare/v0.3.0...v0.3.1) (2026-06-24)


### Bug Fixes

* **update:** 1h TTL + stale-while-revalidate for the latest-release check ([e0984f0](https://github.com/diegopeixoto/posterpilot/commit/e0984f022372fd4e0449f94402764c591d8ae271))
* **update:** defer What's New until the check resolves; reword cache note ([3f2665e](https://github.com/diegopeixoto/posterpilot/commit/3f2665e7fa807f665de19d060e42b6fb8ebe29c6))
* **update:** only show What's New once the running version's notes resolve ([2bdd4cb](https://github.com/diegopeixoto/posterpilot/commit/2bdd4cbce8d03f714bcf5779c53efbc687cdf6ef))
* **update:** show running-version notes in What's New, re-check periodically ([2298885](https://github.com/diegopeixoto/posterpilot/commit/2298885b4d2983e75ae964ae4b7714bbc778d601))
* **update:** show running-version notes in What's New, re-check periodically ([c1d820c](https://github.com/diegopeixoto/posterpilot/commit/c1d820cd8c48661f8ded71d864ebc1b6331c67f9))

## [0.3.0](https://github.com/diegopeixoto/posterpilot/compare/v0.2.2...v0.3.0) (2026-06-24)


### ⚠ BREAKING CHANGES

* **i18n:** deployments that set the UI locale via `LANGUAGE` must rename it to `APP_LANGUAGE`. Hosts that had `LANGUAGE` set for unrelated POSIX reasons will now correctly fall through to the saved setting or Accept-Language instead of being locked.

### Features

* **i18n:** show pending state while switching language ([f007fdd](https://github.com/diegopeixoto/posterpilot/commit/f007fdd39cdb2093623819b78f2ed492bbce9f2a))


### Bug Fixes

* **i18n:** rename LANGUAGE env var to APP_LANGUAGE ([f5d5b16](https://github.com/diegopeixoto/posterpilot/commit/f5d5b16b3fad8c69147a4321692826f73801a2c2))
* **settings:** persist numeric fields with type=number inputs ([4937b0d](https://github.com/diegopeixoto/posterpilot/commit/4937b0d16825e724643daa62b8231bdd02e089e8))
* **setup:** require both Plex URL and token before advancing ([5861a6a](https://github.com/diegopeixoto/posterpilot/commit/5861a6afa522648a838ee9fef6a66126ef4ddc7b))
* **ux:** harden destructive actions, validation and a11y across surfaces ([6132e85](https://github.com/diegopeixoto/posterpilot/commit/6132e85a61f7bb836ca67c6ce24dbe0f17f9c2fc))
* **ux:** harden destructive actions, validation, a11y and i18n across surfaces ([b3a6915](https://github.com/diegopeixoto/posterpilot/commit/b3a69150ea9a46eed81fd237e421a9d6d5ea546d))

## [0.2.2](https://github.com/diegopeixoto/posterpilot/compare/v0.2.1...v0.2.2) (2026-06-24)


### Bug Fixes

* **whats-new:** render release notes as markdown ([524c655](https://github.com/diegopeixoto/posterpilot/commit/524c6559eb2c352fcaf19d946b73d1ef91f09082))
* **whats-new:** render release notes as markdown ([bfc421a](https://github.com/diegopeixoto/posterpilot/commit/bfc421a8d10c3ba2135cb65cc7200c3e80664469))

## [0.2.1](https://github.com/diegopeixoto/posterpilot/compare/v0.2.0...v0.2.1) (2026-06-24)


### Bug Fixes

* **a11y:** keep popover focus indicator visible on open ([5415fc5](https://github.com/diegopeixoto/posterpilot/commit/5415fc5ac7e56e7509e3a66494b9edd9d288e971))
* **a11y:** resolve frontend audit findings (WCAG AA, reduced-motion, focus) ([7131258](https://github.com/diegopeixoto/posterpilot/commit/7131258edccb80805a9d688c11ab3c65d15a804c))
* **a11y:** resolve frontend audit findings (WCAG AA, reduced-motion, focus) ([6d4ed94](https://github.com/diegopeixoto/posterpilot/commit/6d4ed94424df3ae2e596d7ec1ac5211a872db623))

## [0.2.0](https://github.com/diegopeixoto/posterpilot/compare/v0.1.0...v0.2.0) (2026-06-23)


### Features

* **branding:** logo'd README hero, favicon, docs logos, Unraid template ([f3add61](https://github.com/diegopeixoto/posterpilot/commit/f3add6113ba8b0ef17546f11279ef5d6f78b7bf4))
* **events:** activity log / events view (*arr-style) ([2be7cfc](https://github.com/diegopeixoto/posterpilot/commit/2be7cfc15b484a7e14783d3b527e8db08ce2f8f3))
* **i18n:** localize UI to en/es/zh/ja/pt-BR with Paraglide + Weblate ([c4ad50e](https://github.com/diegopeixoto/posterpilot/commit/c4ad50ed7625039dc4534c720f0e68a585a94c5a))
* **item:** friendly apply result message ([a4b9976](https://github.com/diegopeixoto/posterpilot/commit/a4b9976b381b30ba78dd92df4eb340e909fa34eb))
* **library:** Notion-style filter & sort (popovers + chips) ([33ddd8e](https://github.com/diegopeixoto/posterpilot/commit/33ddd8ed636ddedb94421cd859fa02567f4efe4a))
* **logging:** rotating file log (LOG_DIR), configurable retention, Clear activity ([4c30947](https://github.com/diegopeixoto/posterpilot/commit/4c30947cc157b83cf45f5c572b21636aff035dda))
* **media-server:** MediaServer abstraction (Plex/Jellyfin/Emby) + Plex login & discovery ([f70fe22](https://github.com/diegopeixoto/posterpilot/commit/f70fe22773f1d69348545cf01a76754d77a80bd2))
* **onboarding,update:** wizard library step + What's New modal ([3bc4df3](https://github.com/diegopeixoto/posterpilot/commit/3bc4df30b730929c01ee77f6670cf1e5ec9611e5))
* **onboarding:** settings tabs, first-install wizard, page titles, UA id ([9c69548](https://github.com/diegopeixoto/posterpilot/commit/9c6954854d7fddfa7ad70914458a3a797e3fb104))
* **oss:** MIT license, community docs, CI, GHCR publishing, release-please, health endpoint ([5d335d9](https://github.com/diegopeixoto/posterpilot/commit/5d335d96d8fbbaa737287956c29125f5191be818))
* **plex,ui:** plain-IP local connections, trademark disclaimer, drop verbose hint ([c875602](https://github.com/diegopeixoto/posterpilot/commit/c8756029db218b09c7f79bbd5681a9101bdaf3e6))
* **providers:** poster-provider abstraction + Fanart.tv, TMDB-artwork, ThePosterDB ([6c6108c](https://github.com/diegopeixoto/posterpilot/commit/6c6108c41f22e4dbf97f71abe4037bf394efb472))
* **ui:** MediUX-style redesign — metadata, artwork sets, custom-set builder ([41ccb36](https://github.com/diegopeixoto/posterpilot/commit/41ccb3623d7df85ec1ba59f43c30f22d7c28f80a))
* **ux:** library polish, update checker, view transitions ([df03665](https://github.com/diegopeixoto/posterpilot/commit/df036659ea7fb33ce07960495ca456cc2a16684d))


### Bug Fixes

* **media-server:** 8s timeout on connection tests so Settings never hangs ([6e226b8](https://github.com/diegopeixoto/posterpilot/commit/6e226b89fb2b71c5ecee4b8e5ccfbf3412543c78))
* **settings:** bound the library fetch to 5s so Settings never hangs ([2506137](https://github.com/diegopeixoto/posterpilot/commit/2506137c385e9b270ba848afcf8ba4eb1b5ca9cd))

## Changelog

All notable changes to PosterPilot are documented in this file.

This file is maintained automatically by
[release-please](https://github.com/googleapis/release-please) from
[Conventional Commits](https://www.conventionalcommits.org/). Do not edit it by
hand — write good commit messages instead.
