# Personal Portfolio Website

## Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/olaf8543/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start development server**:

```bash
npm run dev
```

4. **Open in browser**:

```
http://localhost:5173
```

## Music Link Converter Converter

Frontend and backend code for the converter can be found in
`/src/pages/Converter.jsx`
and
`/backend`
respectively.

## Customization

1. Update profile content in:
   - `HomeSection.jsx`
   - `AboutSection.jsx`
   - `SkillsSection.jsx`
   - `ProjectsSection.jsx`
   - `ContactSection.jsx`

2. Replace assets:
   - Update SVG files in `/src/assets`

3. Configure themes:
   - Edit colors in `index.css`

Deploy the generated `dist/` folder to any static hosting (Netlify, Vercel, GitHub Pages).

## Type Safety

- Type checking through JSDoc comments
- Run type verification:

```bash
npm run types
```

## Dependencies

- Node.js 20
