# Setup Guide: Discussions & Leaderboard

## 1. Leaderboard (Supabase)

1. **Create a Supabase Project**: Go to [database.new](https://database.new) and create a free project.
2. **Run SQL Schema**:
    * Go to the **SQL Editor** in your Supabase dashboard.
    * Copy the content of `supabase/schema.sql` from this repository.
    * Paste it into the editor and click **Run**.
3. **Get Credentials**:
    * Go to **Project Settings** -> **API**.
    * Copy the **Project URL** and **anon public key**.
4. **Configure Environment**:
    * Create a file named `.env` in the root of your project.
    * Add your credentials (see `.env.example`):

        ```env
        PUBLIC_SUPABASE_URL=https://your-project.supabase.co
        PUBLIC_SUPABASE_ANON_KEY=your-anon-key
        ```

## 2. Discussions (Giscus)

1. **Enable Discussions**:
    * Go to your GitHub repository **Settings**.
    * Scroll down to **Features** and check the box for **Discussions**.
2. **Install Giscus App**:
    * Go to [giscus.app](https://giscus.app).
    * Follow the instructions to install the Giscus GitHub App on your repository.
3. **Get Configuration**:
    * On the Giscus website, enter your repository name (`username/repo`).
    * Select the **Discussion Category** (e.g., "Q&A").
    * Scroll down to the **Enable giscus** section.
    * Copy the values for `data-repo-id` and `data-category-id`.
4. **Update Code**:
    * ✅ **DONE**: I have already updated `src/components/CommentsSection.svelte` with your Repository ID (`R_kgDOQdUufA`) and Category ID (`DIC_kwDOQdUufM4CzG1i`).
    * ⚠️ **ACTION REQUIRED**: You MUST install the Giscus App for the comments to appear. Go to **[https://github.com/apps/giscus](https://github.com/apps/giscus)** and click **Install**. Select your repository `iberi22/saberparatodos`.
