const genes = [
  ['Gene-A', 'Drought', 'Water regulation', '91%', 'Possible drought response'],
  ['Gene-B', 'Heat', 'Protein stability', '87%', 'Possible heat response'],
  ['Gene-C', 'Salinity', 'Ion transport', '84%', 'Possible salt response'],
]

const tools = [
  ['ESM-2', 'Protein language model concept', 'Future Model Integration'],
  ['DNABERT', 'DNA sequence model concept', 'Future Model Integration'],
  ['Candidate gene analysis', 'Prioritize genes for further research', 'Prototype Research Data'],
  ['CRISPR gRNA concept', 'Demonstrate a computational design step', 'Demonstration Only'],
]

function GenomicInsights() {
  return (
    <section className="genomics-section" id="genomics">
      <div className="section-wrap">
        <div className="genomics-heading">
          <div><p className="eyebrow">Micro · biological adaptation</p><h2>From climate stress<br />to research questions.</h2></div>
          <p>This section illustrates how future genomic tools could help researchers explore biological response. No sequence model or gene-editing system is connected.</p>
        </div>
        <div className="bio-flow" aria-label="Conceptual biological analysis flow">
          {['Climate stress', 'Biological analysis', 'Protein analysis', 'Gene regulation', 'Candidate genes', 'gRNA concept'].map((item, index) => (
            <div className="bio-flow-item" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 5 && <b aria-hidden="true">→</b>}</div>
          ))}
        </div>
        <div className="research-tools">
          {tools.map(([name, description, status], index) => <article className="research-tool" key={name}>
            <span className="tool-index">0{index + 1}</span><span className="tool-status">{status}</span>
            <h3>{name}</h3><p>{description}</p>
          </article>)}
        </div>
        <div className="gene-table-wrap">
          <div className="table-heading"><div><p className="eyebrow">Example research records</p><h3>Candidate gene concepts</h3></div><span className="prototype-tag">PROTOTYPE RESEARCH DATA</span></div>
          <div className="table-scroll"><table>
            <thead><tr><th>Gene</th><th>Stress</th><th>Function</th><th>Confidence</th><th>Potential adaptation</th></tr></thead>
            <tbody>{genes.map(([gene, stress, functionName, confidence, adaptation]) => <tr key={gene}>
              <td><strong>{gene}</strong></td><td>{stress}</td><td>{functionName}</td><td>{confidence}</td><td>{adaptation}</td>
            </tr>)}</tbody>
          </table></div>
          <p className="small-note">Illustrative demo records only. These are not experimentally validated discoveries.</p>
        </div>
        <div className="guide-sequence">
          <div><p className="eyebrow">Demonstration / prototype sequence</p><h3>CRISPR gRNA concept</h3><p>Shows what a computational design record might contain. No gene editing is performed or validated.</p></div>
          <div className="sequence-data"><div><span>Target gene</span><strong>Gene-A (demo)</strong></div><div><span>Target region</span><strong>Region 01</strong></div><div><span>Guide RNA</span><code>GCUAUGACCUAGUACGAUCG</code></div><div><span>Length</span><strong>20 bases</strong></div><div><span>Status</span><strong>Concept only</strong></div></div>
        </div>
      </div>
    </section>
  )
}

export default GenomicInsights