interface PatternCardProps {
  title: string;
  path: string;
  codePath: string;
  description: string;
  renderBehavior: string;
  pros: string[];
  cons: string[];
  onNavigate: (path: string) => void;
}

const PatternCard: React.FC<PatternCardProps> = ({
  title,
  path,
  codePath,
  description,
  renderBehavior,
  pros,
  cons,
  onNavigate,
}) => {
  return (
    <div className="pattern-card">
      <h2>{title}</h2>
      <p className="description">{description}</p>

      <div className="section">
        <h3>🔄 Re-render Behavior</h3>
        <p>{renderBehavior}</p>
      </div>

      <div className="pros-cons">
        <div className="pros">
          <h3>✅ Performance Pros</h3>
          <ul>
            {pros.map((pro, i) => (
              <li key={i}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="cons">
          <h3>❌ Performance Cons</h3>
          <ul>
            {cons.map((con, i) => (
              <li key={i}>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-buttons">
        <button className="navigate-btn" onClick={() => onNavigate(path)}>
          View Demo →
        </button>
        <button className="code-btn" onClick={() => onNavigate(codePath)}>
          View Code →
        </button>
      </div>
    </div>
  );
};

interface OverviewProps {
  onNavigate: (path: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const patterns: Omit<PatternCardProps, "onNavigate">[] = [
    {
      title: "Self-Driven Components",
      path: "/self-driven",
      codePath: "/self-driven/code",
      description:
        "Best render performance. Each component manages its own state and only re-renders when its own state changes. Siblings and parent are never affected.",
      renderBehavior:
        "Isolated re-renders. When a child component increments its count, only that child re-renders. Parent and sibling components remain untouched. This is the most performant pattern for independent components.",
      pros: [
        "Minimal re-renders - only affected component updates",
        "memo() works perfectly - no prop changes",
        "Siblings never re-render on state changes",
        "Parent doesn't re-render when children update",
        "Best scalability for many independent components",
      ],
      cons: [
        "Refs add complexity for cross-component triggers",
        "Parent cannot read children's current state",
        "Harder to implement features needing global state",
        "State scattered across components",
      ],
    },
    {
      title: "Parent-Driven Components",
      path: "/parent-driven",
      codePath: "/parent-driven/code",
      description:
        "Moderate render performance. Parent re-renders on every state change, but memo() with useCallback prevents unnecessary child re-renders when their props don't change.",
      renderBehavior:
        "Parent always re-renders on any state change. Children with memo() skip re-render if their specific props haven't changed. useCallback is required for stable callback references.",
      pros: [
        "memo() prevents child re-renders when props unchanged",
        "useCallback ensures stable function references",
        "Predictable render behavior - easy to optimize",
        "Parent has full visibility for debugging",
      ],
      cons: [
        "Parent ALWAYS re-renders on any state change",
        "Requires useCallback for every callback prop",
        "Forgetting memo or useCallback causes cascading re-renders",
        "More state = more parent re-renders",
        "Inline callbacks break memo optimization",
      ],
    },
    {
      title: "Context-Driven Components",
      path: "/context-driven",
      codePath: "/context-driven/code",
      description:
        "Worst render performance with single context. ALL components consuming the context re-render when ANY context value changes, regardless of which value they actually use.",
      renderBehavior:
        "Every context consumer re-renders on any context change. Even if a component only uses one value, it re-renders when other values change because the context object reference changes.",
      pros: [
        "No prop drilling overhead",
        "Clean component interfaces",
        "Can split into multiple contexts for optimization",
        "Good for infrequently changing data (themes, auth)",
      ],
      cons: [
        "ALL consumers re-render on ANY context change",
        "memo() doesn't help - context bypasses it",
        "Single context = worst re-render performance",
        "Need multiple contexts to isolate re-renders",
        "Not suitable for frequently updating state",
      ],
    },
  ];

  return (
    <div className="overview">
      <header className="overview-header">
        <h1>React Re-render Performance Comparison</h1>
        <p>
          Compare how different state management patterns affect component re-renders.
          Watch the "Render Count" in each demo to see the performance differences in action.
        </p>
      </header>

      <div className="comparison-table">
        <h2>Re-render Performance Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Self-Driven</th>
              <th>Parent-Driven</th>
              <th>Context-Driven</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State Ownership</td>
              <td>Distributed</td>
              <td>Centralized (Parent)</td>
              <td>Centralized (Context)</td>
            </tr>
            <tr>
              <td>Re-render Scope</td>
              <td>Only affected component</td>
              <td>Parent + children</td>
              <td>All context consumers</td>
            </tr>
            <tr>
              <td>Component Coupling</td>
              <td>Low</td>
              <td>Medium</td>
              <td>High</td>
            </tr>
            <tr>
              <td>Cross-component Sync</td>
              <td>Via refs</td>
              <td>Parent mediates</td>
              <td>Shared context</td>
            </tr>
            <tr>
              <td>Best Use Case</td>
              <td>Independent widgets</td>
              <td>Simple hierarchies</td>
              <td>Deep nesting, themes</td>
            </tr>
            <tr>
              <td>Performance Rating</td>
              <td>⭐⭐⭐ Best</td>
              <td>⭐⭐ Good</td>
              <td>⭐ Worst</td>
            </tr>
            <tr>
              <td>memo() Effectiveness</td>
              <td>Perfect</td>
              <td>With useCallback</td>
              <td>Doesn't help</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="patterns-grid">
        {patterns.map((pattern) => (
          <PatternCard key={pattern.path} {...pattern} onNavigate={onNavigate} />
        ))}
      </div>

      <footer className="overview-footer">
        <p>
          💡 <strong>Tip:</strong> Watch the "Render Count" in each demo to
          understand how different patterns affect component re-renders.
        </p>
      </footer>
    </div>
  );
};

export default Overview;
