import React, { useState } from 'react';
import { BookOpen, Target, LayoutDashboard, Calculator, ShieldAlert, Zap, Globe } from 'lucide-react';

export function Documentation() {
  const [language, setLanguage] = useState<'en' | 'nl'>('en');

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto space-y-8 pb-20">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
          className="flex items-center space-x-2 bg-black/30 border border-white/10 hover:bg-white/5 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Globe size={16} />
          <span>{language === 'en' ? 'Switch to Dutch' : 'Schakel over naar Engels'}</span>
        </button>
      </div>

      <div className="glass-card rounded-xl p-8 neon-glow-cyan">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 neon-text-cyan">
          {language === 'en' ? 'Sports OS Operator Manual' : 'Sports OS Gebruikershandleiding'}
        </h1>
        <p className="text-slate-400">
          {language === 'en' 
            ? 'A step-by-step guide to executing quant-style data-driven analysis, probability reasoning, and risk-aware decision support using the Sports Analytics OS framework.'
            : 'Een stapsgewijze gids voor het uitvoeren van kwantitatieve datagestuurde analyse, waarschijnlijkheidsredenering en risicobewuste beslissingsondersteuning met behulp van het Sports Analytics OS-framework.'}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Step 1 */}
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <span className="font-mono font-bold text-lg">1</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                {language === 'en' ? 'System Overview & KPI Dashboard' : 'Systeemoverzicht & KPI Dashboard'}
                <LayoutDashboard size={18} className="ml-2 text-slate-500" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {language === 'en' 
                  ? <>Begin every session by reviewing the <strong>KPI Dashboard</strong>. This is your macro portfolio view.</>
                  : <>Begin elke sessie door het <strong>KPI Dashboard</strong> te bekijken. Dit is uw macro-portefeuilleweergave.</>}
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-400 space-y-2">
                {language === 'en' ? (
                  <>
                    <li>Verify your <strong>Current Bankroll</strong> and <strong>System ROI</strong> are accurately synced.</li>
                    <li>Check the <strong>Bankroll Trajectory & CLV Drift</strong> chart. A rising green line indicates your models are beating the closing line, which is the strongest indicator of long-term profitability.</li>
                    <li>Review the <strong>Efficiency Scanners</strong> for high-variance alerts (e.g., late injury news, weather impacts) that may require immediate manual intervention or exposure adjustment.</li>
                  </>
                ) : (
                  <>
                    <li>Controleer of uw <strong>Huidige Bankroll</strong> en <strong>Systeem ROI</strong> nauwkeurig gesynchroniseerd zijn.</li>
                    <li>Bekijk de <strong>Bankroll Traject & CLV Drift</strong> grafiek. Een stijgende groene lijn geeft aan dat uw modellen de 'closing line' verslaan, wat de sterkste indicator is voor winstgevendheid op lange termijn.</li>
                    <li>Bekijk de <strong>Efficiëntiescanners</strong> voor meldingen over hoge variantie (bijv. laat nieuws over blessures, weersinvloeden) die onmiddellijke handmatige interventie of aanpassing van blootstelling kunnen vereisen.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="font-mono font-bold text-lg">2</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                {language === 'en' ? 'Identify Edge using Expected Value (EV)' : 'Identificeer Voordeel met Verwachte Waarde (EV)'}
                <Calculator size={18} className="ml-2 text-slate-500" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {language === 'en'
                  ? <>When you have a quantitative model output or strong consensus on a probability, use the <strong>Expected Value Calculator</strong>.</>
                  : <>Wanneer u de uitvoer van een kwantitatief model of een sterke consensus over een waarschijnlijkheid heeft, gebruikt u de <strong>Verwachte Waarde Calculator</strong>.</>}
              </p>
               <ul className="list-disc pl-5 text-sm text-slate-400 space-y-2">
                 {language === 'en' ? (
                   <>
                    <li>Input the best available market price into <strong>Market Odds (American)</strong> (e.g., -110 or +150).</li>
                    <li>Input your model's estimated win probability into <strong>Model Probability (%)</strong>.</li>
                    <li>The system will instantly calculate the True Edge and EV percentage.</li>
                    <li><strong>Rule of Thumb:</strong> Only execute positions classified as "Moderate Edge" or "High Value". Discard negative EV propositions entirely.</li>
                   </>
                 ) : (
                   <>
                    <li>Voer de best beschikbare marktprijs in bij <strong>Marktkansen (Amerikaans)</strong> (bijv. -110 of +150).</li>
                    <li>Voer de geschatte winstkans van uw model in bij <strong>Model Waarschijnlijkheid (%)</strong>.</li>
                    <li>Het systeem berekent direct het Werkelijke Voordeel en het EV percentage.</li>
                    <li><strong>Vuistregel:</strong> Voer alleen posities uit die geclassificeerd zijn als "Matig Voordeel" of "Hoge Waarde". Negeer proposities met een negatieve EV volledig.</li>
                   </>
                 )}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <span className="font-mono font-bold text-lg">3</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                {language === 'en' ? 'Calculate Position Sizing' : 'Bereken Positiegrootte'}
                <Target size={18} className="ml-2 text-slate-500" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {language === 'en'
                  ? <>Never guess your exposure. Use the <strong>Bankroll Exposure Manager</strong> to apply Fractional Kelly criterion principles to protect your capital from ruin sequences.</>
                  : <>Raad nooit uw blootstelling. Gebruik de <strong>Bankroll Exposure Manager</strong> om principes van de Fractionele Kelly-criteria toe te passen om uw kapitaal te beschermen tegen verliesreeksen.</>}
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-400 space-y-2">
                {language === 'en' ? (
                  <>
                    <li>Input your exact <strong>Total Bankroll</strong>.</li>
                    <li>Input the <strong>Expected Value (EV %)</strong> you calculated in Step 2.</li>
                    <li>Set the <strong>Kelly Multiplier</strong> based on your risk tolerance (default is 0.25, or "Quarter Kelly", which is standard for quantitative sports modeling).</li>
                    <li>The module will output exactly how many dollars to risk. Do not exceed this number.</li>
                    <li><strong>Warning:</strong> Pay close attention to the "Risk Status" badge. Anything flagged as "High" or "Extreme" indicates you are over-leveraged based on the statistical edge.</li>
                  </>
                ) : (
                  <>
                    <li>Voer uw exacte <strong>Totale Bankroll</strong> in.</li>
                    <li>Voer de <strong>Verwachte Waarde (EV %)</strong> in die u in Stap 2 heeft berekend.</li>
                    <li>Stel de <strong>Kelly Vermenigvuldiger</strong> in op basis van uw risicotolerantie (standaard is 0.25, of "Kwart Kelly", wat standaard is voor kwantitatieve sportmodellering).</li>
                    <li>De module geeft precies aan hoeveel dollars u moet riskeren. Overschrijd dit bedrag niet.</li>
                    <li><strong>Waarschuwing:</strong> Let goed op de "Risicostatus" badge. Alles wat gemarkeerd is als "Hoog" of "Extreem" geeft aan dat u te veel hefboomwerking (over-leveraged) gebruikt op basis van het statistische voordeel.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <span className="font-mono font-bold text-lg">4</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                {language === 'en' ? 'Analyze Market Context' : 'Analyseer Marktcontext'}
                <Zap size={18} className="ml-2 text-slate-500" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {language === 'en'
                  ? <>Before executing, verify you are getting the best price using the <strong>Odds Comparison Engine</strong>.</>
                  : <>Verifieer voordat u uitvoert of u de beste prijs krijgt met de <strong>Odds Comparison Engine</strong>.</>}
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-400 space-y-2">
                {language === 'en' ? (
                  <>
                    <li>Enter the <strong>Event / Matchup</strong> and the <strong>Sportsbooks</strong> you have access to.</li>
                    <li>Paste the <strong>Reported Odds</strong> across the market and the <strong>Market Average</strong>.</li>
                    <li>The engine will calculate the <strong>Implied Probability</strong> of the market average.</li>
                    <li>Click "Execute Comparison" to have the AI generate a structural report highlighting market outliers, variance, and the best available price.</li>
                  </>
                ) : (
                  <>
                    <li>Voer het <strong>Evenement / Wedstrijd</strong> in en de <strong>Sportsbooks</strong> waartoe u toegang heeft.</li>
                    <li>Plak de <strong>Gerapporteerde Kansen</strong> in de markt en het <strong>Marktgemiddelde</strong>.</li>
                    <li>De engine berekent de <strong>Impliciete Waarschijnlijkheid</strong> van het marktgemiddelde.</li>
                    <li>Klik op "Vergelijking Uitvoeren" om de AI een structureel rapport te laten genereren dat marktuitschieters, variantie en de best beschikbare prijs benadrukt.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
              <span className="font-mono font-bold text-lg">5</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
                {language === 'en' ? 'Deep Dive with Generative AI Modules' : 'Diepgaande Analyse met Generatieve AI Modules'}
                <ShieldAlert size={18} className="ml-2 text-slate-500" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {language === 'en'
                  ? <>For complex, multi-variable situations, utilize the Generative AI analysis modules (e.g., <em>Game Analysis Generator, Injury Impact Analyzer, Weather Effects</em>).</>
                  : <>Gebruik voor complexe, meervariabele situaties de Generatieve AI analysemodules (bijv. <em>Game Analysis Generator, Injury Impact Analyzer, Weather Effects</em>).</>}
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-400 space-y-2">
                {language === 'en' ? (
                  <>
                    <li>Select the relevant tool from the Sidebar under the "Reports" category.</li>
                    <li>Provide detailed context in the prompt input (e.g., "Analyze the impact of Giannis Antetokounmpo being out for MIL vs CHI tonight, focusing on rebounding percentage and pace.")</li>
                    <li>The system will return a purely analytical, neutral, business-focused report. It will not provide picks or guarantees, but it will provide the probability reasoning you need to make a quantitative decision.</li>
                  </>
                ) : (
                  <>
                    <li>Selecteer de relevante tool in de zijbalk onder de categorie "Rapporten".</li>
                    <li>Geef gedetailleerde context in de prompt-invoer (bijv. "Analyseer de impact van de afwezigheid van Giannis Antetokounmpo voor MIL vs CHI vanavond, met focus op het percentage rebounds en het tempo.")</li>
                    <li>Het systeem retourneert een puur analytisch, neutraal, bedrijfsgericht rapport. Het geeft geen 'picks' of garanties, maar het biedt de waarschijnlijkheidsredenering die u nodig heeft om een kwantitatieve beslissing te nemen.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
