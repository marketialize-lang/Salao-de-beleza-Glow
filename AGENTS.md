<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep reference analysis and asset inventories in `.lovable/` documents separate from application code, because a recorded reference site is not a production media source.
- Keep GLOW public content in the index route with explicit in-page anchors, because the brief requests one continuous editorial page.
- Centralize display services in src/data/glow.ts and mirror authoritative centavo prices in booking SQL through migrations; changing prices requires updating both and tests to prevent displayed/reserved amount drift.
- Use public validated server functions backed by narrow database RPCs for availability and reservations; private reservation rows remain protected by database admin authorization.
- Home effects like the services beam frame and title wave live in src/components/glow/beam-card.tsx and are driven by one shared animation clock; do not add competing rAF loops touching the same elements.
- Do not seed booking settings or grant first-user admin access; real capacity, durations and team authorization must be supplied before selling time slots.
