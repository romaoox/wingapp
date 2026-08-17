"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  glyph: string;
  badge?: string;
};

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Principal",
    items: [
      { label: "Visão geral", glyph: "grid" },
      { label: "CRM", glyph: "↗", badge: "14" },
      { label: "Clientes", glyph: "◎" },
    ],
  },
  {
    title: "Operação",
    items: [
      { label: "Projetos", glyph: "◇" },
      { label: "Tarefas", glyph: "✓", badge: "8" },
      { label: "Conteúdo", glyph: "▦" },
      { label: "Aprovações", glyph: "⌁", badge: "12" },
      { label: "Calendário", glyph: "□" },
    ],
  },
  {
    title: "Gestão",
    items: [
      { label: "Painel do gestor", glyph: "▤", badge: "3" },
      { label: "Equipe", glyph: "○" },
      { label: "Financeiro", glyph: "R$" },
      { label: "Relatórios", glyph: "≋" },
      { label: "Automações", glyph: "⚡" },
    ],
  },
];

const moduleDescriptions: Record<string, string> = {
  CRM: "Pipeline comercial e oportunidades da agência",
  Clientes: "Relacionamento, contratos e saúde da carteira",
  Projetos: "Entregas, cronogramas e rentabilidade",
  Tarefas: "Produção priorizada em toda a agência",
  Conteúdo: "Planejamento editorial multicanal",
  Aprovações: "Conteúdos aguardando decisão dos clientes",
  Calendário: "Campanhas, reuniões, entregas e publicações",
  "Painel do gestor": "Visão consolidada de toda a operação da agência",
  Equipe: "Capacidade, desempenho e distribuição de carga",
  Financeiro: "Caixa, recorrência e margem da operação",
  Relatórios: "Indicadores executivos em tempo real",
  Automações: "Fluxos inteligentes conectando toda a operação",
};

const people = [
  { name: "Júlia", initials: "JM", color: "violet" },
  { name: "Caio", initials: "CS", color: "blue" },
  { name: "Lia", initials: "LA", color: "peach" },
  { name: "Rafa", initials: "RF", color: "green" },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src="/wing-mark-v2.png" alt="" />
    </span>
  );
}

function MiniIcon({ glyph }: { glyph: string }) {
  if (glyph === "grid") {
    return (
      <span className="grid-icon" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    );
  }
  return (
    <span className={`nav-glyph ${glyph === "R$" ? "currency-glyph" : ""}`} aria-hidden="true">
      {glyph}
    </span>
  );
}

function Avatar({
  initials,
  color = "dark",
  size = "md",
}: {
  initials: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  return <span className={`avatar avatar-${color} avatar-${size}`}>{initials}</span>;
}

function Sidebar({
  active,
  onNavigate,
  mobileOpen,
  onClose,
}: {
  active: string;
  onNavigate: (label: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button
        className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={onClose}
        aria-label="Fechar menu"
        tabIndex={mobileOpen ? 0 : -1}
      />
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand-row">
          <BrandMark />
          <span className="brand-lockup">
            <span className="brand-name">WING</span>
            <small>by QORVO</small>
          </span>
          <span className="version-tag">beta</span>
          <button className="mobile-close" onClick={onClose} aria-label="Fechar menu">
            ×
          </button>
        </div>

        <button className="workspace-switcher" aria-label="Trocar empresa">
          <span className="workspace-avatar">QG</span>
          <span>
            <strong>Qorvo Growth</strong>
            <small>Marketing · agência principal</small>
          </span>
          <span className="chevrons" aria-hidden="true">⌃⌄</span>
        </button>

        <nav className="main-nav" aria-label="Navegação principal">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              <p>{group.title}</p>
              {group.items.map((item) => (
                <button
                  className={`nav-item ${active === item.label ? "active" : ""}`}
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.label);
                    onClose();
                  }}
                  aria-current={active === item.label ? "page" : undefined}
                >
                  <MiniIcon glyph={item.glyph} />
                  <span>{item.label}</span>
                  {item.badge && <em>{item.badge}</em>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="upgrade-card">
            <span className="upgrade-icon">✦</span>
            <span>
              <strong>QORVO IQ</strong>
              <small>Inteligência para a operação</small>
            </span>
            <b>›</b>
          </button>
          <button className="user-card">
            <Avatar initials="MR" color="peach" />
            <span>
              <strong>Marina Rocha</strong>
              <small>Administradora</small>
            </span>
            <b>•••</b>
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({
  active,
  darkMode,
  onTheme,
  onMenu,
  onSearch,
  onCreate,
  onQuickAction,
  onNotify,
}: {
  active: string;
  darkMode: boolean;
  onTheme: () => void;
  onMenu: () => void;
  onSearch: () => void;
  onCreate: () => void;
  onQuickAction: (label: string) => void;
  onNotify: () => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={onMenu} aria-label="Abrir menu">
          <span />
          <span />
          <span />
        </button>
        <div className="breadcrumbs">
          <span>Qorvo Growth Marketing</span>
          <b>/</b>
          <strong>{active}</strong>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="search-trigger" onClick={onSearch}>
          <span className="search-symbol" aria-hidden="true" />
          <span>Buscar em tudo...</span>
          <kbd>⌘ K</kbd>
        </button>
        <button className="icon-button theme-button" onClick={onTheme} aria-label="Alternar tema">
          <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
        </button>
        <button className="icon-button notification-button" onClick={onNotify} aria-label="Abrir notificações">
          <span className="bell-symbol" aria-hidden="true">♧</span>
          <i />
        </button>
        <button className="topbar-quick-button secondary-quick" onClick={() => onQuickAction("Novo projeto")}>
          <span>＋</span>
          Novo projeto
        </button>
        <button className="topbar-quick-button secondary-quick" onClick={() => onQuickAction("Novo cliente")}>
          <span>＋</span>
          Novo cliente
        </button>
        <button className="primary-button topbar-new-task" onClick={onCreate}>
          <span>＋</span>
          Nova tarefa
        </button>
        <button className="topbar-user" onClick={() => onQuickAction("Perfil do usuário aberto")} aria-label="Abrir perfil de Marina Rocha">
          <Avatar initials="MR" color="peach" size="sm" />
          <span><strong>Marina Rocha</strong><small>Administradora</small></span>
          <b>⌄</b>
        </button>
      </div>
    </header>
  );
}

function MetricCard({
  label,
  value,
  helper,
  trend,
  tone,
  glyph,
  progress,
}: {
  label: string;
  value: string;
  helper: string;
  trend: string;
  tone: string;
  glyph: string;
  progress?: number;
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon metric-${tone}`}>{glyph}</span>
        <span className={`trend ${trend.startsWith("+") ? "positive" : trend.startsWith("−") ? "negative" : ""}`}>
          {trend}
        </span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{helper}</small>
      {progress !== undefined && (
        <span className="metric-progress">
          <i style={{ width: `${progress}%` }} />
        </span>
      )}
    </article>
  );
}

function LegacyDashboardOverview({ onToast }: { onToast: (message: string) => void }) {
  const bars = [42, 51, 47, 64, 58, 74, 69, 78, 67, 88, 79, 93];

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">SEXTA-FEIRA, 25 DE JULHO</p>
          <h1>Bom dia, Marina <span>✦</span></h1>
          <p className="heading-copy">Aqui está o pulso da sua agência hoje.</p>
        </div>
        <div className="heading-actions">
          <button className="secondary-button" onClick={() => onToast("Dashboard compartilhado com sua equipe")}>
            <span aria-hidden="true">↗</span>
            Compartilhar
          </button>
          <button className="date-button">
            <span className="calendar-mini" aria-hidden="true" />
            01–25 jul. 2026
            <b>⌄</b>
          </button>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Indicadores principais">
        <MetricCard
          label="Receita do mês"
          value="R$ 184,2 mil"
          helper="vs. R$ 163,6 mil em junho"
          trend="+12,6%"
          tone="green"
          glyph="↗"
        />
        <MetricCard
          label="Margem operacional"
          value="31,8%"
          helper="Meta mensal de 35%"
          trend="+3,2%"
          tone="violet"
          glyph="%"
          progress={91}
        />
        <MetricCard
          label="Horas faturáveis"
          value="1.248h"
          helper="78% das horas registradas"
          trend="+8,4%"
          tone="blue"
          glyph="◷"
          progress={78}
        />
        <MetricCard
          label="Capacidade da equipe"
          value="84%"
          helper="3 pessoas acima do limite"
          trend="Atenção"
          tone="orange"
          glyph="◎"
          progress={84}
        />
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-main-column">
          <article className="panel revenue-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">PERFORMANCE</span>
                <h2>Receita recorrente</h2>
              </div>
              <div className="legend">
                <span><i className="legend-current" />2026</span>
                <span><i className="legend-previous" />2025</span>
              </div>
            </div>
            <div className="revenue-summary">
              <div>
                <strong>R$ 142.800</strong>
                <span>MRR atual</span>
              </div>
              <div>
                <strong>+R$ 18.400</strong>
                <span>Crescimento no período</span>
              </div>
              <div>
                <strong>2,4%</strong>
                <span>Churn</span>
              </div>
            </div>
            <div className="chart-area" aria-label="Gráfico de receita de janeiro a dezembro">
              <div className="y-axis">
                <span>200k</span>
                <span>150k</span>
                <span>100k</span>
                <span>50k</span>
                <span>0</span>
              </div>
              <div className="bar-chart">
                {bars.map((height, index) => (
                  <div className="bar-group" key={index}>
                    <div className="bar-track">
                      <i className="bar-previous" style={{ height: `${Math.max(height - 18, 20)}%` }} />
                      <i className="bar-current" style={{ height: `${height}%` }} />
                    </div>
                    <span>{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="panel projects-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">OPERAÇÃO</span>
                <h2>Projetos em movimento</h2>
              </div>
              <button className="text-button" onClick={() => onToast("Abrindo todos os projetos")}>Ver todos <span>→</span></button>
            </div>
            <div className="project-table">
              <div className="project-row project-head">
                <span>Projeto</span>
                <span>Equipe</span>
                <span>Prazo</span>
                <span>Progresso</span>
                <span />
              </div>
              {[
                { client: "Vitta", name: "Campanha Viva o Agora", color: "vitta", deadline: "28 jul", progress: 72, avatars: ["JM", "CS"] },
                { client: "OCA", name: "Rebranding institucional", color: "oca", deadline: "04 ago", progress: 54, avatars: ["LA", "RF"] },
                { client: "Nexo", name: "Lançamento Nexo One", color: "nexo", deadline: "12 ago", progress: 38, avatars: ["CS", "MR"] },
                { client: "Lumina", name: "Always-on Social", color: "lumina", deadline: "Contínuo", progress: 86, avatars: ["JM", "LA"] },
              ].map((project) => (
                <button className="project-row" key={project.name} onClick={() => onToast(`${project.name} aberto`)}>
                  <span className="project-name">
                    <i className={`client-mark ${project.color}`}>{project.client.slice(0, 1)}</i>
                    <span>
                      <strong>{project.name}</strong>
                      <small>{project.client}</small>
                    </span>
                  </span>
                  <span className="avatar-stack">
                    {project.avatars.map((avatar, index) => (
                      <Avatar key={avatar} initials={avatar} color={index === 0 ? "violet" : "blue"} size="sm" />
                    ))}
                  </span>
                  <span className={project.deadline === "28 jul" ? "deadline-soon" : ""}>{project.deadline}</span>
                  <span className="project-progress">
                    <i><b style={{ width: `${project.progress}%` }} /></i>
                    <em>{project.progress}%</em>
                  </span>
                  <span className="row-arrow">›</span>
                </button>
              ))}
            </div>
          </article>
        </div>

        <aside className="dashboard-side-column">
          <article className="ai-card">
            <div className="ai-top">
              <span className="ai-orb">✦</span>
              <span className="ai-live"><i />AGENCY AI</span>
            </div>
            <h2>3 ações podem liberar 18h da equipe esta semana.</h2>
            <p>Identifiquei gargalos em aprovações e uma distribuição desigual no time de criação.</p>
            <button onClick={() => onToast("Plano inteligente gerado")}>Ver plano recomendado <span>→</span></button>
            <div className="ai-grid" aria-hidden="true" />
          </article>

          <article className="panel capacity-panel">
            <div className="panel-header compact">
              <div>
                <span className="panel-kicker">EQUIPE</span>
                <h2>Capacidade hoje</h2>
              </div>
              <button className="more-button" aria-label="Mais opções">•••</button>
            </div>
            <div className="capacity-list">
              {[
                { person: people[0], role: "Design", value: 96 },
                { person: people[1], role: "Tráfego", value: 88 },
                { person: people[2], role: "Conteúdo", value: 74 },
                { person: people[3], role: "Vídeo", value: 62 },
              ].map(({ person, role, value }) => (
                <div className="capacity-row" key={person.name}>
                  <Avatar initials={person.initials} color={person.color} size="sm" />
                  <span className="capacity-person">
                    <strong>{person.name}</strong>
                    <small>{role}</small>
                  </span>
                  <span className="capacity-bar">
                    <i style={{ width: `${value}%` }} className={value > 90 ? "over" : value > 80 ? "high" : ""} />
                  </span>
                  <b>{value}%</b>
                </div>
              ))}
            </div>
            <button className="panel-footer-button" onClick={() => onToast("Visão de capacidade aberta")}>Redistribuir carga <span>→</span></button>
          </article>

          <article className="panel approvals-panel">
            <div className="panel-header compact">
              <div>
                <span className="panel-kicker">CLIENTES</span>
                <h2>Aprovações pendentes</h2>
              </div>
              <span className="count-badge">12</span>
            </div>
            <button className="approval-item" onClick={() => onToast("Aprovação da Vitta aberta")}>
              <span className="approval-thumb thumb-one"><i>V</i></span>
              <span>
                <strong>Carrossel Dia do Bem-estar</strong>
                <small>Vitta • há 3 dias</small>
              </span>
              <em>Urgente</em>
            </button>
            <button className="approval-item" onClick={() => onToast("Aprovação da OCA aberta")}>
              <span className="approval-thumb thumb-two"><i>O</i></span>
              <span>
                <strong>Manifesto da nova marca</strong>
                <small>OCA • há 1 dia</small>
              </span>
              <b>›</b>
            </button>
            <button className="panel-footer-button" onClick={() => onToast("Central de aprovações aberta")}>Abrir central <span>→</span></button>
          </article>
        </aside>
      </section>
    </>
  );
}

type PersonalTask = {
  id: string;
  title: string;
  client: string;
  stage: string;
  due: string;
  priority: "Alta" | "Média" | "Baixa";
  group: "Hoje" | "Amanhã" | "Esta semana" | "Atrasadas" | "Concluídas";
  progress: number;
  tags: string[];
};

const personalTasks: PersonalTask[] = [
  { id: "task-1", title: "Criar arte — Instagram Feed", client: "Academia BioAtiva", stage: "Produção", due: "Hoje 11:00", priority: "Alta", group: "Hoje", progress: 62, tags: ["Hoje", "Produção"] },
  { id: "task-2", title: "Revisar Landing Page", client: "Clínica Harmonia", stage: "Aguardando aprovação", due: "Hoje 16:00", priority: "Média", group: "Hoje", progress: 88, tags: ["Hoje", "Aguardando"] },
  { id: "task-3", title: "Vídeo institucional", client: "Construtora Alfa", stage: "Ajuste solicitado", due: "Hoje 17:00", priority: "Alta", group: "Hoje", progress: 48, tags: ["Hoje", "Produção"] },
  { id: "task-4", title: "Campanha Google Ads", client: "Loja XPTO", stage: "Em andamento", due: "Hoje 18:00", priority: "Média", group: "Hoje", progress: 71, tags: ["Hoje", "Produção"] },
  { id: "task-5", title: "Calendário editorial de agosto", client: "Orbe Arquitetura", stage: "Briefing", due: "Amanhã 10:00", priority: "Média", group: "Amanhã", progress: 20, tags: ["Semana"] },
  { id: "task-6", title: "Roteiro para Reels de lançamento", client: "Mori Café", stage: "Copy", due: "Amanhã 15:00", priority: "Baixa", group: "Amanhã", progress: 35, tags: ["Semana", "Produção"] },
  { id: "task-7", title: "Relatório mensal de mídia", client: "Nexo One", stage: "Análise", due: "31 jul", priority: "Média", group: "Esta semana", progress: 54, tags: ["Semana"] },
  { id: "task-8", title: "Ajustar capa do YouTube", client: "Vitta", stage: "Atrasada", due: "Ontem 17:00", priority: "Alta", group: "Atrasadas", progress: 76, tags: ["Atrasadas", "Produção"] },
  { id: "task-9", title: "Aprovar pauta de julho", client: "OCA", stage: "Concluída", due: "Hoje 09:15", priority: "Baixa", group: "Concluídas", progress: 100, tags: ["Concluídas"] },
];

const urgentTasks = [
  { id: "urgent-1", title: "Aprovar campanha Black Friday", client: "Loja XPTO", due: "Prazo: hoje às 14:00" },
  { id: "urgent-2", title: "Cliente BioAtiva solicitou alteração", client: "Reels Promocional", due: "Prazo: 30 min" },
  { id: "urgent-3", title: "Vídeo institucional em atraso", client: "Construtora Alfa", due: "Atrasado há 2h" },
];

const initialHomeNotifications = [
  { id: 1, icon: "↳", tone: "blue", initials: "CS", title: "Caio comentou em uma tarefa que você participa", copy: "“@Marina consegue revisar isso para mim?”", meta: "Projeto: Campanha Black Friday", time: "Agora", unread: true },
  { id: 2, icon: "✎", tone: "yellow", initials: "BA", title: "Cliente BioAtiva solicitou um ajuste", copy: "“Por favor, trocar a imagem do banner.”", meta: "Tarefa: Reels Promocional", time: "há 3 minutos", unread: true },
  { id: 3, icon: "✓", tone: "green", initials: "CL", title: "Cliente aprovou a publicação", copy: "“Aprovado! Obrigada.”", meta: "Publicação: Campanha Dia das Mães", time: "há 15 minutos", unread: false },
  { id: 4, icon: "!", tone: "red", initials: "RF", title: "Tarefa marcada como URGENTE", copy: "Prazo: hoje às 15:00", meta: "Projeto: Lançamento Black Friday", time: "há 20 minutos", unread: true },
  { id: 5, icon: "@", tone: "blue", initials: "MR", title: "Mariana mencionou você em um comentário", copy: "“@Marina o botão precisa estar igual ao layout.”", meta: "Projeto: Redesign Site", time: "há 1 hora", unread: true },
  { id: 6, icon: "⌁", tone: "yellow", initials: "CH", title: "Novo pedido de aprovação", copy: "Landing Page — Interna", meta: "Cliente: Clínica Harmonia", time: "há 2 horas", unread: false },
];

const homeStats = [
  { label: "Urgentes", value: "3", icon: "!", tone: "red" },
  { label: "Não lidas", value: "12", icon: "▣", tone: "blue" },
  { label: "Tarefas hoje", value: "9", icon: "□", tone: "blue" },
  { label: "Em atraso", value: "2", icon: "◷", tone: "orange" },
  { label: "Aguardando cliente", value: "5", icon: "⌛", tone: "yellow" },
  { label: "Concluídas hoje", value: "14", icon: "✓", tone: "green" },
];

function DashboardOverview({ onToast }: { onToast: (message: string) => void }) {
  const filters = ["Todas", "Hoje", "Semana", "Atrasadas", "Produção", "Aguardando", "Concluídas"];
  const [taskFilter, setTaskFilter] = useState("Todas");
  const [completedIds, setCompletedIds] = useState<string[]>(["task-9"]);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    Amanhã: true,
    "Esta semana": true,
    Atrasadas: true,
    Concluídas: true,
  });
  const [notifications, setNotifications] = useState(initialHomeNotifications);
  const [msnOpen, setMsnOpen] = useState(false);
  const [urgentOpen, setUrgentOpen] = useState(false);
  const [urgentSeen, setUrgentSeen] = useState(false);

  useEffect(() => {
    const notificationTimer = window.setTimeout(() => setMsnOpen(true), 700);
    const urgentTimer = window.setTimeout(() => setUrgentOpen(true), 1450);
    return () => {
      window.clearTimeout(notificationTimer);
      window.clearTimeout(urgentTimer);
    };
  }, []);

  const visibleTasks = useMemo(() => {
    return personalTasks.filter((task) => {
      const isCompleted = completedIds.includes(task.id);
      if (taskFilter === "Todas") return true;
      if (taskFilter === "Concluídas") return isCompleted;
      if (isCompleted) return false;
      return task.tags.includes(taskFilter);
    });
  }, [taskFilter, completedIds]);

  const groupedTasks = useMemo(() => {
    const order = ["Hoje", "Amanhã", "Esta semana", "Atrasadas", "Concluídas"] as const;
    return order
      .map((group) => ({ group, tasks: visibleTasks.filter((task) => task.group === group) }))
      .filter(({ tasks }) => tasks.length > 0);
  }, [visibleTasks]);

  const unreadCount = notifications.filter((note) => note.unread).length;

  const toggleTask = (task: PersonalTask) => {
    setCompletedIds((current) =>
      current.includes(task.id) ? current.filter((id) => id !== task.id) : [...current, task.id],
    );
    onToast(completedIds.includes(task.id) ? `${task.title} reaberta` : `${task.title} concluída`);
  };

  const openNotification = (id: number, title: string) => {
    setNotifications((current) => current.map((note) => note.id === id ? { ...note, unread: false } : note));
    onToast(`${title} aberta`);
  };

  return (
    <section className="user-home" aria-label="Página inicial personalizada de Marina Rocha">
      <header className="user-home-intro">
        <div>
          <span className="user-home-eyebrow"><i /> SEU ESPAÇO DE TRABALHO</span>
          <h1>Bom dia, Marina</h1>
          <p>Estas são as tarefas, alertas e atualizações que precisam da sua atenção hoje.</p>
        </div>
        <div className="user-home-actions">
          <button onClick={() => setMsnOpen(true)}><span>♧</span> Testar notificação</button>
          <button onClick={() => setUrgentOpen(true)}><span>!</span> Testar urgência</button>
        </div>
      </header>

      <div className="user-home-grid">
        <div className="user-task-column">
          <article className={`urgent-focus-panel ${urgentSeen ? "seen" : ""}`}>
            <div className="urgent-panel-header">
              <div><span className="urgent-alert-icon">!</span><h2>Tarefas urgentes</h2></div>
              <span className="urgent-count">3</span>
            </div>
            <div className="urgent-task-list">
              {urgentTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setUrgentSeen(true);
                    setUrgentOpen(true);
                  }}
                >
                  <span className="urgent-dot" />
                  <span><strong>{task.title}</strong><small>{task.client}</small></span>
                  <em>{task.due}</em>
                </button>
              ))}
            </div>
          </article>

          <article className="my-tasks-panel">
            <div className="my-tasks-header">
              <div><h2>Minhas tarefas</h2><span>{personalTasks.length}</span></div>
              <div className="task-header-tools">
                <button aria-label="Pesquisar tarefas" onClick={() => onToast("Pesquisa de tarefas aberta")}>⌕</button>
                <button aria-label="Filtrar tarefas" onClick={() => onToast("Filtros avançados abertos")}>▽</button>
                <button aria-label="Ordenar tarefas" onClick={() => onToast("Tarefas ordenadas por prazo")}>↕</button>
              </div>
            </div>
            <div className="task-filter-tabs" role="tablist" aria-label="Filtros das minhas tarefas">
              {filters.map((filter) => (
                <button
                  role="tab"
                  aria-selected={taskFilter === filter}
                  className={taskFilter === filter ? "active" : ""}
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                >
                  {filter}
                  {filter === "Hoje" && <span>4</span>}
                  {filter === "Atrasadas" && <span className="danger">1</span>}
                </button>
              ))}
            </div>
            <div className="personal-task-groups">
              {groupedTasks.map(({ group, tasks }) => {
                const collapsed = collapsedGroups[group];
                return (
                  <div className="personal-task-group" key={group}>
                    <button
                      className="task-group-toggle"
                      onClick={() => setCollapsedGroups((current) => ({ ...current, [group]: !collapsed }))}
                      aria-expanded={!collapsed}
                    >
                      <span>{collapsed ? "›" : "⌄"}</span>
                      <strong>{group === "Hoje" ? "Hoje · 25 de julho" : group}</strong>
                      <em>{tasks.length}</em>
                    </button>
                    {!collapsed && tasks.map((task) => {
                      const completed = completedIds.includes(task.id);
                      return (
                        <article className={`personal-task-row ${completed ? "completed" : ""}`} key={task.id}>
                          <button
                            className="task-check"
                            onClick={() => toggleTask(task)}
                            aria-label={completed ? `Reabrir ${task.title}` : `Concluir ${task.title}`}
                          >
                            {completed ? "✓" : ""}
                          </button>
                          <button className="task-main-button" onClick={() => onToast(`${task.title} aberta`)}>
                            <span className="task-main-copy">
                              <strong>{task.title}</strong>
                              <small>Cliente: {task.client}</small>
                            </span>
                            <span className={`task-stage stage-${task.stage.toLowerCase().replaceAll(" ", "-")}`}>{task.stage}</span>
                            <span className="task-progress"><i><b style={{ width: `${task.progress}%` }} /></i><em>{task.progress}%</em></span>
                            <span className="task-owner"><Avatar initials="MR" color="peach" size="sm" /><small>{task.due}</small></span>
                            <span className={`task-priority priority-${task.priority.toLowerCase()}`}><i />{task.priority}</span>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                );
              })}
              {groupedTasks.length === 0 && (
                <div className="task-empty-state"><span>✓</span><strong>Nenhuma tarefa neste filtro</strong><p>Você está em dia por aqui.</p></div>
              )}
            </div>
            <button className="task-panel-footer" onClick={() => onToast("Todas as tarefas abertas")}>Ver todas as minhas tarefas <span>→</span></button>
          </article>
        </div>

        <div className="user-notification-column">
          <div className="user-stat-grid" aria-label="Indicadores pessoais">
            {homeStats.map((stat) => (
              <button className={`user-stat-card stat-${stat.tone}`} key={stat.label} onClick={() => onToast(`Filtro ${stat.label} aplicado`)}>
                <span>{stat.icon}</span>
                <strong>{stat.label === "Não lidas" ? unreadCount : stat.value}</strong>
                <small>{stat.label}</small>
              </button>
            ))}
          </div>

          <article className="notification-wall">
            <div className="notification-wall-header">
              <div><h2>Mural de notificações</h2><span>{unreadCount}</span></div>
              <button
                onClick={() => {
                  setNotifications((current) => current.map((note) => ({ ...note, unread: false })));
                  onToast("Todas as notificações foram marcadas como lidas");
                }}
              >
                <i>✓</i> Marcar todas como lidas
              </button>
            </div>
            <div className="notification-wall-list">
              {notifications.map((note) => (
                <article className={`wall-notification ${note.unread ? "unread" : ""}`} key={note.id}>
                  <span className={`wall-note-type type-${note.tone}`}>{note.icon}</span>
                  <Avatar initials={note.initials} color={note.tone === "yellow" ? "orange" : note.tone === "red" ? "peach" : note.tone} />
                  <div className="wall-note-copy">
                    <strong>{note.title}</strong>
                    <p>{note.copy}</p>
                    <small>{note.meta}</small>
                  </div>
                  <div className="wall-note-actions">
                    <span>{note.time}{note.unread && <i />}</span>
                    <button onClick={() => openNotification(note.id, note.title)}>Abrir</button>
                  </div>
                </article>
              ))}
            </div>
            <button className="notification-wall-footer" onClick={() => onToast("Central completa de notificações aberta")}>Ver todas as notificações <span>→</span></button>
          </article>
        </div>
      </div>

      <aside className={`msn-notification ${msnOpen ? "show" : ""}`} role="status" aria-live="polite">
        <button className="popup-close" onClick={() => setMsnOpen(false)} aria-label="Fechar notificação">×</button>
        <span className="msn-bell">♧</span>
        <div>
          <small>NOVA NOTIFICAÇÃO</small>
          <strong>Cliente BioAtiva</strong>
          <p>Solicitou ajuste na tarefa <b>“Reels Promocional”</b></p>
        </div>
        <button
          className="msn-open-button"
          onClick={() => {
            setMsnOpen(false);
            openNotification(2, "Ajuste da BioAtiva");
          }}
        >
          Abrir
        </button>
      </aside>

      {urgentOpen && (
        <div className="urgent-modal-backdrop" role="presentation">
          <section className="urgent-modal" role="alertdialog" aria-modal="true" aria-labelledby="urgent-modal-title">
            <button className="popup-close" onClick={() => setUrgentOpen(false)} aria-label="Fechar alerta urgente">×</button>
            <span className="urgent-modal-icon">!</span>
            <small>ATENÇÃO IMEDIATA</small>
            <h2 id="urgent-modal-title">Tarefa urgente</h2>
            <strong>Campanha Black Friday</strong>
            <p>Marcada como <b>PRIORIDADE MÁXIMA</b></p>
            <div className="urgent-deadline"><span>□</span><small>Prazo<strong>Hoje às 15:00</strong></small></div>
            <button
              className="urgent-open-button"
              onClick={() => {
                setUrgentOpen(false);
                setUrgentSeen(true);
                onToast("Campanha Black Friday aberta");
              }}
            >
              Abrir tarefa
            </button>
            <button className="urgent-close-button" onClick={() => setUrgentOpen(false)}>Visualizar depois</button>
          </section>
        </div>
      )}
    </section>
  );
}

const pipelineColumns = [
  {
    title: "Novo lead",
    value: "R$ 46 mil",
    tone: "slate",
    cards: [
      { name: "Mori Café", contact: "Amanda Lima", value: "R$ 8 mil", tag: "Indicação", initials: "AL" },
      { name: "MedCare", contact: "Paulo Reis", value: "R$ 18 mil", tag: "Inbound", initials: "PR" },
    ],
  },
  {
    title: "Reunião",
    value: "R$ 72 mil",
    tone: "blue",
    cards: [
      { name: "Mundo Fit", contact: "Bianca Melo", value: "R$ 24 mil", tag: "Evento", initials: "BM" },
      { name: "Auri Hotels", contact: "Carlos Neri", value: "R$ 32 mil", tag: "Outbound", initials: "CN" },
    ],
  },
  {
    title: "Proposta",
    value: "R$ 58 mil",
    tone: "violet",
    cards: [
      { name: "Flora Lab", contact: "Nina Vaz", value: "R$ 16 mil", tag: "Inbound", initials: "NV" },
      { name: "Alma Casa", contact: "Igor Luz", value: "R$ 22 mil", tag: "Indicação", initials: "IL" },
    ],
  },
  {
    title: "Negociação",
    value: "R$ 36 mil",
    tone: "orange",
    cards: [
      { name: "Solaris", contact: "Lara Alves", value: "R$ 28 mil", tag: "Parceiro", initials: "LA" },
    ],
  },
];

function ModuleHeader({
  active,
  onToast,
}: {
  active: string;
  onToast: (message: string) => void;
}) {
  return (
    <section className="page-heading module-heading">
      <div>
        <p className="eyebrow">NORTE STUDIO · {active.toUpperCase()}</p>
        <h1>{active}</h1>
        <p className="heading-copy">{moduleDescriptions[active]}</p>
      </div>
      <div className="heading-actions">
        <button className="secondary-button" onClick={() => onToast(`Filtros de ${active} atualizados`)}>
          <span className="filter-glyph">≡</span>
          Filtrar
        </button>
        <button className="primary-button large" onClick={() => onToast(`Novo registro em ${active}`)}>
          <span>＋</span>
          Novo
        </button>
      </div>
    </section>
  );
}

function CrmWorkspace({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <div className="module-stats">
        <div><span>Pipeline aberto</span><strong>R$ 212 mil</strong><em>+18% no mês</em></div>
        <div><span>Taxa de conversão</span><strong>28,4%</strong><em>+4,1 p.p.</em></div>
        <div><span>Ticket médio</span><strong>R$ 14,8 mil</strong><em>por contrato</em></div>
        <div><span>Ciclo médio</span><strong>24 dias</strong><em>−3 dias</em></div>
      </div>
      <section className="kanban-shell crm-kanban">
        <div className="kanban-toolbar">
          <div>
            <button className="view-tab active">Pipeline</button>
            <button className="view-tab">Lista</button>
            <button className="view-tab">Previsão</button>
          </div>
          <span>14 oportunidades · R$ 212 mil</span>
        </div>
        <div className="kanban-board">
          {pipelineColumns.map((column) => (
            <div className="kanban-column" key={column.title}>
              <div className="kanban-column-head">
                <span><i className={`column-dot ${column.tone}`} />{column.title}<b>{column.cards.length}</b></span>
                <em>{column.value}</em>
              </div>
              {column.cards.map((card) => (
                <button className="deal-card" key={card.name} onClick={() => onToast(`${card.name} aberto no CRM`)}>
                  <span className="deal-top">
                    <i className="deal-logo">{card.name.slice(0, 1)}</i>
                    <b>•••</b>
                  </span>
                  <strong>{card.name}</strong>
                  <small>{card.contact}</small>
                  <span className="deal-meta">
                    <em>{card.tag}</em>
                    <b>{card.value}</b>
                  </span>
                  <span className="deal-bottom">
                    <Avatar initials={card.initials} color="peach" size="sm" />
                    <span>Próxima ação <b>Hoje</b></span>
                  </span>
                </button>
              ))}
              <button className="add-card" onClick={() => onToast(`Nova oportunidade em ${column.title}`)}>＋ Adicionar oportunidade</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function OperationsWorkspace({
  active,
  onToast,
}: {
  active: string;
  onToast: (message: string) => void;
}) {
  const columns = [
    {
      name: active === "Aprovações" ? "Aguardando cliente" : "Briefing",
      color: "slate",
      cards: [
        { title: "Roteiro Reel — Bastidores", client: "Lumina", tag: "REELS", deadline: "Hoje", progress: 80 },
        { title: "KV Campanha Inverno", client: "OCA", tag: "DESIGN", deadline: "28 jul", progress: 45 },
      ],
    },
    {
      name: active === "Calendário" ? "Esta semana" : "Em produção",
      color: "blue",
      cards: [
        { title: "Landing Page Nexo One", client: "Nexo", tag: "WEB", deadline: "29 jul", progress: 62 },
        { title: "Carrossel Vida Leve", client: "Vitta", tag: "SOCIAL", deadline: "Hoje", progress: 74 },
        { title: "Motion manifesto", client: "OCA", tag: "VÍDEO", deadline: "01 ago", progress: 38 },
      ],
    },
    {
      name: active === "Aprovações" ? "Alterações" : "Revisão interna",
      color: "violet",
      cards: [
        { title: "Campanha Search Julho", client: "Vitta", tag: "ADS", deadline: "Hoje", progress: 92 },
        { title: "Manual de tom de voz", client: "Mori", tag: "BRAND", deadline: "30 jul", progress: 86 },
      ],
    },
    {
      name: active === "Conteúdo" ? "Agendado" : "Aguardando aprovação",
      color: "orange",
      cards: [
        { title: "Feed institucional — 6 peças", client: "Lumina", tag: "SOCIAL", deadline: "Cliente", progress: 100 },
        { title: "Filme 30s — Versão final", client: "Nexo", tag: "VÍDEO", deadline: "Cliente", progress: 100 },
      ],
    },
  ];

  return (
    <>
      <div className="module-filter-row">
        <div className="filter-tabs">
          <button className="active">Quadro</button>
          <button>Lista</button>
          <button>Timeline</button>
          <button>Workload</button>
        </div>
        <div className="filter-actions">
          <span className="avatar-stack">
            <Avatar initials="JM" color="violet" size="sm" />
            <Avatar initials="CS" color="blue" size="sm" />
            <Avatar initials="+8" color="soft" size="sm" />
          </span>
          <button>Ordenar: Prioridade <span>⌄</span></button>
        </div>
      </div>
      <section className="kanban-shell operation-kanban">
        <div className="kanban-board">
          {columns.map((column) => (
            <div className="kanban-column" key={column.name}>
              <div className="kanban-column-head">
                <span><i className={`column-dot ${column.color}`} />{column.name}<b>{column.cards.length}</b></span>
                <button aria-label={`Opções de ${column.name}`}>•••</button>
              </div>
              {column.cards.map((card) => (
                <button className="task-card" key={card.title} onClick={() => onToast(`${card.title} aberto`)}>
                  <span className="task-card-top">
                    <em>{card.tag}</em>
                    <b>•••</b>
                  </span>
                  <strong>{card.title}</strong>
                  <small>{card.client}</small>
                  <span className="task-progress"><i style={{ width: `${card.progress}%` }} /></span>
                  <span className="task-footer">
                    <Avatar initials={card.client.slice(0, 2).toUpperCase()} color="soft" size="sm" />
                    <span className={card.deadline === "Hoje" ? "is-today" : ""}>{card.deadline}</span>
                    <em>◷ {Math.round(card.progress / 12)}h</em>
                  </span>
                </button>
              ))}
              <button className="add-card" onClick={() => onToast(`Nova tarefa em ${column.name}`)}>＋ Adicionar tarefa</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function TeamWorkspace({ onToast }: { onToast: (message: string) => void }) {
  const team = [
    { name: "Júlia Martins", role: "Lead Designer", initials: "JM", color: "violet", booked: 96, hours: "38,5h", billable: "82%" },
    { name: "Caio Souza", role: "Gestor de Tráfego", initials: "CS", color: "blue", booked: 88, hours: "36h", billable: "91%" },
    { name: "Lia Andrade", role: "Social Media", initials: "LA", color: "peach", booked: 74, hours: "31h", billable: "76%" },
    { name: "Rafael Freire", role: "Videomaker", initials: "RF", color: "green", booked: 62, hours: "27h", billable: "68%" },
    { name: "Nina Torres", role: "Copywriter", initials: "NT", color: "orange", booked: 81, hours: "34h", billable: "79%" },
  ];
  return (
    <>
      <div className="module-stats team-stats">
        <div><span>Capacidade média</span><strong>84%</strong><em>Faixa saudável</em></div>
        <div><span>Horas esta semana</span><strong>486h</strong><em>78% faturáveis</em></div>
        <div><span>Alocação livre</span><strong>64h</strong><em>Próximos 7 dias</em></div>
        <div><span>Risco de sobrecarga</span><strong>3 pessoas</strong><em className="attention">Requer atenção</em></div>
      </div>
      <section className="panel team-panel">
        <div className="team-toolbar">
          <div>
            <h2>Distribuição da equipe</h2>
            <p>25–31 de julho · 40h disponíveis por pessoa</p>
          </div>
          <div className="capacity-legend">
            <span><i className="healthy" />Saudável</span>
            <span><i className="busy" />Ocupado</span>
            <span><i className="overload" />Sobrecarga</span>
          </div>
        </div>
        <div className="team-table">
          <div className="team-row team-head">
            <span>Colaborador</span><span>Capacidade</span><span>Horas</span><span>Faturável</span><span>Projetos</span><span />
          </div>
          {team.map((member, index) => (
            <button className="team-row" key={member.name} onClick={() => onToast(`Agenda de ${member.name} aberta`)}>
              <span className="team-person">
                <Avatar initials={member.initials} color={member.color} />
                <span><strong>{member.name}</strong><small>{member.role}</small></span>
              </span>
              <span className="workload-cell">
                <span><i style={{ width: `${member.booked}%` }} className={member.booked > 90 ? "overload" : member.booked > 80 ? "busy" : ""} /></span>
                <b>{member.booked}%</b>
              </span>
              <strong>{member.hours}</strong>
              <span>{member.billable}</span>
              <span className="avatar-stack">
                <i className={`mini-client client-${index % 3}`}>{["V", "O", "N"][index % 3]}</i>
                <i className={`mini-client client-${(index + 1) % 3}`}>{["V", "O", "N"][(index + 1) % 3]}</i>
                <i className="mini-client more">+{index + 1}</i>
              </span>
              <span className="row-arrow">›</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function FinanceWorkspace({ onToast }: { onToast: (message: string) => void }) {
  const financeBars = [55, 62, 59, 72, 68, 76, 81, 79, 86, 84, 91, 96];
  return (
    <>
      <div className="module-stats finance-stats">
        <div><span>Saldo disponível</span><strong>R$ 286,4 mil</strong><em>3 contas conectadas</em></div>
        <div><span>Receber</span><strong>R$ 78,2 mil</strong><em>Nos próximos 15 dias</em></div>
        <div><span>Pagar</span><strong>R$ 42,6 mil</strong><em>Nos próximos 15 dias</em></div>
        <div><span>Inadimplência</span><strong>R$ 8,4 mil</strong><em className="attention">4 clientes</em></div>
      </div>
      <section className="finance-layout">
        <article className="panel cashflow-card">
          <div className="panel-header">
            <div><span className="panel-kicker">FLUXO DE CAIXA</span><h2>Visão consolidada</h2></div>
            <button className="period-select">Últimos 12 meses <span>⌄</span></button>
          </div>
          <div className="cashflow-total">
            <div><span>Entradas</span><strong>R$ 1,84 mi</strong></div>
            <div><span>Saídas</span><strong>R$ 1,22 mi</strong></div>
            <div><span>Resultado</span><strong className="green-text">R$ 620 mil</strong></div>
          </div>
          <div className="finance-chart">
            {financeBars.map((height, index) => (
              <div key={index}>
                <span className="income-bar" style={{ height: `${height}%` }} />
                <span className="expense-bar" style={{ height: `${height * 0.62}%` }} />
                <small>{["Ago", "Set", "Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"][index]}</small>
              </div>
            ))}
          </div>
        </article>
        <article className="panel invoice-card">
          <div className="panel-header compact">
            <div><span className="panel-kicker">PRÓXIMOS</span><h2>Vencimentos</h2></div>
            <button className="more-button">•••</button>
          </div>
          {[
            { date: "26", month: "JUL", name: "Folha de pagamento", type: "Despesa", value: "R$ 48.620", tone: "red" },
            { date: "28", month: "JUL", name: "Vitta — Mensalidade", type: "Receita", value: "R$ 18.400", tone: "green" },
            { date: "30", month: "JUL", name: "Ferramentas SaaS", type: "Despesa", value: "R$ 6.280", tone: "red" },
            { date: "01", month: "AGO", name: "OCA — Branding", type: "Receita", value: "R$ 24.800", tone: "green" },
          ].map((item) => (
            <button className="invoice-row" key={item.name} onClick={() => onToast(`${item.name} aberto`)}>
              <span className="date-box"><strong>{item.date}</strong><small>{item.month}</small></span>
              <span><strong>{item.name}</strong><small>{item.type}</small></span>
              <b className={`${item.tone}-text`}>{item.value}</b>
            </button>
          ))}
          <button className="panel-footer-button" onClick={() => onToast("Contas a pagar e receber abertas")}>Ver todos os lançamentos <span>→</span></button>
        </article>
      </section>
    </>
  );
}

function ManagerDashboardModern({ onToast }: { onToast: (message: string) => void }) {
  const [period, setPeriod] = useState("Esta semana");
  const [client, setClient] = useState("Todos os clientes");
  const [teamFilter, setTeamFilter] = useState("Todas as equipes");
  const [riskOnly, setRiskOnly] = useState(false);

  const kpis = [
    { icon: "PR", label: "Projetos ativos", value: client === "Todos os clientes" ? "28" : "4", trend: "+12%", note: "vs. período anterior", tone: "blue" },
    { icon: "TF", label: "Tarefas totais", value: client === "Todos os clientes" ? "186" : "32", trend: "+8%", note: "vs. período anterior", tone: "blue" },
    { icon: "OK", label: "Concluídas", value: client === "Todos os clientes" ? "142" : "24", trend: "76%", note: "do total planejado", tone: "green" },
    { icon: "EP", label: "Em produção", value: client === "Todos os clientes" ? "46" : "9", trend: "25%", note: "do fluxo atual", tone: "yellow" },
    { icon: "!", label: "Atrasadas", value: client === "Todos os clientes" ? "14" : "3", trend: "−5%", note: "vs. período anterior", tone: "red" },
    { icon: "CL", label: "Clientes ativos", value: client === "Todos os clientes" ? "18" : "1", trend: "+2", note: "novos neste mês", tone: "purple" },
  ];

  const taskStages = [
    { label: "Briefing", count: 18, share: "10%", tone: "purple" },
    { label: "Planejamento", count: 24, share: "13%", tone: "blue" },
    { label: "Produção", count: 46, share: "25%", tone: "yellow" },
    { label: "Revisão interna", count: 21, share: "11%", tone: "red" },
    { label: "Aguardando cliente", count: 17, share: "9%", tone: "orange" },
    { label: "Aprovadas", count: 60, share: "32%", tone: "green" },
  ];

  const overdueTasks = [
    { title: "Rebranding institucional", client: "OCA", delay: "3 dias", owner: "JM", tone: "red" },
    { title: "Reels promocional", client: "BioAtiva", delay: "2 dias", owner: "LA", tone: "orange" },
    { title: "Landing Page Nexo One", client: "Nexo", delay: "1 dia", owner: "NT", tone: "red" },
    { title: "Anúncios Google Ads", client: "Vitta", delay: "6 horas", owner: "CS", tone: "orange" },
  ];

  const projectStatus = [
    { label: "Saudáveis", count: 17, share: "61%", tone: "green" },
    { label: "Em atenção", count: 6, share: "21%", tone: "blue" },
    { label: "Em risco", count: 3, share: "11%", tone: "yellow" },
    { label: "Críticos", count: 2, share: "7%", tone: "red" },
  ];

  const activity = [
    { day: "Seg", done: 62, created: 29 },
    { day: "Ter", done: 84, created: 46 },
    { day: "Qua", done: 71, created: 38 },
    { day: "Qui", done: 78, created: 44 },
    { day: "Sex", done: 56, created: 34 },
    { day: "Sáb", done: 34, created: 19 },
    { day: "Dom", done: 22, created: 11 },
  ];

  const team = [
    { name: "Júlia Martins", role: "Designer", initials: "JM", color: "violet", capacity: 96 },
    { name: "Caio Souza", role: "Tráfego pago", initials: "CS", color: "blue", capacity: 88 },
    { name: "Lia Andrade", role: "Social Media", initials: "LA", color: "peach", capacity: 74 },
    { name: "Rafael Freire", role: "Audiovisual", initials: "RF", color: "green", capacity: 62 },
    { name: "Nina Torres", role: "Copywriter", initials: "NT", color: "orange", capacity: 81 },
  ];

  const slaMetrics = [
    { label: "Primeiro retorno", value: "96%", helper: "Meta 95%", state: "good" },
    { label: "Entrega no prazo", value: "88%", helper: "Meta 92%", state: "watch" },
    { label: "Taxa de aprovação", value: "87%", helper: "+5% no período", state: "good" },
    { label: "Retrabalho", value: "12%", helper: "−3% no período", state: "good" },
  ];

  const projects = [
    { name: "Campanha Viva o Agora", client: "Vitta", progress: 72, stage: "Produção", due: "28 jul", health: "Saudável", tone: "green" },
    { name: "Rebranding institucional", client: "OCA", progress: 54, stage: "Revisão interna", due: "26 jul", health: "Crítico", tone: "red" },
    { name: "Lançamento Nexo One", client: "Nexo", progress: 38, stage: "Aguardando cliente", due: "30 jul", health: "Em risco", tone: "yellow" },
    { name: "Always-on Social", client: "Lumina", progress: 86, stage: "Agendado", due: "Contínuo", health: "Saudável", tone: "green" },
    { name: "Campanha Bio Performance", client: "BioAtiva", progress: 64, stage: "Alterações", due: "Hoje", health: "Em atenção", tone: "blue" },
  ];

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesClient = client === "Todos os clientes" || project.client === client;
        const matchesRisk = !riskOnly || project.tone === "red" || project.tone === "yellow";
        return matchesClient && matchesRisk;
      }),
    [client, riskOnly],
  );

  const updateFilter = (setter: (value: string) => void, value: string, label: string) => {
    setter(value);
    onToast(`${label}: ${value}`);
  };

  return (
    <section className="mg2-dashboard" aria-label="Painel executivo do gestor">
      <header className="mg2-heading">
        <div>
          <h1>Olá, Carlos Eduardo <span aria-hidden="true">👋</span></h1>
          <p>Aqui está o panorama da operação que precisa da sua atenção hoje.</p>
        </div>
        <div className="mg2-heading-actions">
          <label className="mg2-date-filter">
            <span>Período</span>
            <select value={period} onChange={(event) => updateFilter(setPeriod, event.target.value, "Período")}>
              <option>Hoje</option>
              <option>Esta semana</option>
              <option>Este mês</option>
              <option>Últimos 30 dias</option>
            </select>
          </label>
          <button className={`mg2-risk-toggle ${riskOnly ? "active" : ""}`} onClick={() => setRiskOnly((value) => !value)}>
            <span>!</span> Foco em riscos
          </button>
          <button className="mg2-export" onClick={() => onToast("Relatório executivo preparado")}>Exportar relatório</button>
        </div>
      </header>

      <section className="mg2-kpis" aria-label="Indicadores principais">
        {kpis.map((kpi) => (
          <button key={kpi.label} className={`mg2-kpi mg2-${kpi.tone}`} onClick={() => onToast(`${kpi.label} detalhado`)}>
            <span className="mg2-kpi-icon">{kpi.icon}</span>
            <span className="mg2-kpi-copy">
              <small>{kpi.label}</small>
              <strong>{kpi.value}</strong>
              <em><b>{kpi.trend}</b> {kpi.note}</em>
            </span>
          </button>
        ))}
      </section>

      <article className="mg2-ai">
        <div className="mg2-ai-brand"><span>✦</span><small>QORVO IQ · GESTÃO</small></div>
        <div className="mg2-ai-main">
          <strong>3 decisões podem recuperar 27h da operação nesta semana.</strong>
          <p>Redistribua design, escale a aprovação da Nexo e repriorize o audiovisual.</p>
        </div>
        <div className="mg2-ai-signals">
          <span><i className="red" /> Júlia em 96%</span>
          <span><i className="yellow" /> Nexo parado há 3 dias</span>
          <span><i className="blue" /> 2 entregas de vídeo hoje</span>
        </div>
        <button onClick={() => onToast("Plano de ação do gestor gerado")}>Gerar plano de ação <b>→</b></button>
      </article>

      <section className="mg2-overview-grid">
        <article className="mg2-card mg2-stage-card">
          <div className="mg2-card-head">
            <div><small>FLUXO OPERACIONAL</small><h2>Tarefas por etapa</h2></div>
            <button onClick={() => onToast("Kanban operacional aberto")}>Abrir Kanban →</button>
          </div>
          <div className="mg2-donut-layout">
            <div className="mg2-donut mg2-task-donut"><span><strong>186</strong><small>tarefas</small></span></div>
            <div className="mg2-legend">
              {taskStages.map((stage) => (
                <button key={stage.label} onClick={() => onToast(`${stage.count} tarefas em ${stage.label}`)}>
                  <span><i className={stage.tone} />{stage.label}</span><strong>{stage.count}</strong><small>{stage.share}</small>
                </button>
              ))}
            </div>
          </div>
        </article>

        <article className="mg2-card mg2-late-card">
          <div className="mg2-card-head">
            <div><small>ATENÇÃO IMEDIATA</small><h2>Tarefas atrasadas</h2></div>
            <button onClick={() => onToast("Todas as tarefas atrasadas abertas")}>Ver todas →</button>
          </div>
          <div className="mg2-late-list">
            {overdueTasks.map((task) => (
              <button key={task.title} onClick={() => onToast(`${task.title} aberta`)}>
                <span className={`mg2-late-alert ${task.tone}`}>!</span>
                <span><strong>{task.title}</strong><small>{task.client}</small></span>
                <em>{task.delay}<small>de atraso</small></em>
                <Avatar initials={task.owner} color={task.owner === "JM" ? "violet" : task.owner === "LA" ? "peach" : task.owner === "CS" ? "blue" : "orange"} />
              </button>
            ))}
          </div>
          <div className="mg2-late-summary"><span>14 tarefas atrasadas</span><strong>7,5% do fluxo total</strong></div>
        </article>

        <article className="mg2-card mg2-status-card">
          <div className="mg2-card-head">
            <div><small>CARTEIRA</small><h2>Status dos projetos</h2></div>
            <button onClick={() => onToast("Portfólio de projetos aberto")}>Ver todos →</button>
          </div>
          <div className="mg2-donut-layout">
            <div className="mg2-donut mg2-project-donut"><span><strong>28</strong><small>projetos</small></span></div>
            <div className="mg2-legend mg2-project-legend">
              {projectStatus.map((status) => (
                <button key={status.label} onClick={() => onToast(`${status.count} projetos ${status.label.toLowerCase()}`)}>
                  <span><i className={status.tone} />{status.label}</span><strong>{status.count}</strong><small>{status.share}</small>
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="mg2-performance-grid">
        <article className="mg2-card mg2-activity-card">
          <div className="mg2-card-head">
            <div><small>PRODUTIVIDADE</small><h2>Atividade da equipe</h2></div>
            <div className="mg2-chart-legend"><span><i />Concluídas</span><span><i />Criadas</span></div>
          </div>
          <div className="mg2-activity-chart" aria-label="Tarefas concluídas e criadas por dia">
            {activity.map((item) => (
              <div key={item.day} className="mg2-chart-day">
                <span><i className="done" style={{ height: `${item.done}%` }} /><i className="created" style={{ height: `${item.created}%` }} /></span>
                <small>{item.day}</small>
              </div>
            ))}
          </div>
          <div className="mg2-activity-foot"><strong>407 tarefas concluídas</strong><span>+18% de ritmo em relação à semana anterior</span></div>
        </article>

        <article className="mg2-card mg2-workload-card">
          <div className="mg2-card-head">
            <div><small>CAPACIDADE</small><h2>Carga da equipe</h2></div>
            <button onClick={() => onToast("Workload completo aberto")}>Ver todos →</button>
          </div>
          <div className="mg2-team-list">
            {team.map((member) => (
              <button key={member.name} onClick={() => onToast(`Agenda de ${member.name} aberta`)}>
                <Avatar initials={member.initials} color={member.color} />
                <span><strong>{member.name}</strong><small>{member.role}</small></span>
                <i><b className={member.capacity > 90 ? "over" : member.capacity > 80 ? "busy" : ""} style={{ width: `${member.capacity}%` }} /></i>
                <em>{member.capacity}%</em>
              </button>
            ))}
          </div>
        </article>

        <article className="mg2-card mg2-sla-card">
          <div className="mg2-card-head">
            <div><small>QUALIDADE</small><h2>SLA e eficiência</h2></div>
            <span className="mg2-sla-badge">Meta 95%</span>
          </div>
          <div className="mg2-sla-list">
            {slaMetrics.map((metric) => (
              <button key={metric.label} onClick={() => onToast(`Indicador ${metric.label} aberto`)}>
                <span><small>{metric.label}</small><strong>{metric.value}</strong></span>
                <em className={metric.state}>{metric.helper}</em>
              </button>
            ))}
          </div>
          <button className="mg2-sla-warning" onClick={() => onToast("Violações de SLA abertas")}><span>!</span><strong>4 violações nesta semana</strong><b>Ver detalhes →</b></button>
        </article>
      </section>

      <article className="mg2-card mg2-projects-card">
        <div className="mg2-card-head">
          <div><small>PROJETOS EM ANDAMENTO</small><h2>Visão da carteira operacional</h2></div>
          <div className="mg2-project-tools">
            <label>
              <span>Cliente</span>
              <select value={client} onChange={(event) => updateFilter(setClient, event.target.value, "Cliente")}>
                <option>Todos os clientes</option><option>Vitta</option><option>OCA</option><option>Nexo</option><option>Lumina</option><option>BioAtiva</option>
              </select>
            </label>
            <label>
              <span>Equipe</span>
              <select value={teamFilter} onChange={(event) => updateFilter(setTeamFilter, event.target.value, "Equipe")}>
                <option>Todas as equipes</option><option>Criação</option><option>Conteúdo</option><option>Tráfego</option><option>Audiovisual</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mg2-project-table">
          <div className="mg2-project-row mg2-table-head"><span>Projeto e cliente</span><span>Progresso</span><span>Etapa atual</span><span>Prazo</span><span>Saúde</span><span /></div>
          {filteredProjects.length ? filteredProjects.map((project) => (
            <button className="mg2-project-row" key={project.name} onClick={() => onToast(`${project.name} aberto`)}>
              <span className="mg2-project-name"><i>{project.client.slice(0, 1)}</i><span><strong>{project.name}</strong><small>{project.client}</small></span></span>
              <span className="mg2-project-progress"><i><b style={{ width: `${project.progress}%` }} /></i><em>{project.progress}%</em></span>
              <span className="mg2-project-stage">{project.stage}</span>
              <span>{project.due}</span>
              <span className={`mg2-health ${project.tone}`}><i />{project.health}</span>
              <span className="mg2-arrow">›</span>
            </button>
          )) : (
            <div className="mg2-empty">Nenhum projeto encontrado com os filtros selecionados.</div>
          )}
        </div>
      </article>
    </section>
  );
}

function ManagerDashboard({ onToast }: { onToast: (message: string) => void }) {
  const [period, setPeriod] = useState("Esta semana");
  const [client, setClient] = useState("Todos os clientes");
  const [teamFilter, setTeamFilter] = useState("Todas as equipes");
  const [riskOnly, setRiskOnly] = useState(false);

  const projects = [
    { name: "Campanha Viva o Agora", client: "Vitta", status: "Em produção", progress: 72, due: "28 jul", sla: "Dentro do SLA", health: "Saudável", tone: "green", team: ["JM", "LA", "CS"] },
    { name: "Rebranding institucional", client: "OCA", status: "Revisão interna", progress: 54, due: "26 jul", sla: "SLA violado", health: "Crítico", tone: "red", team: ["JM", "NT"] },
    { name: "Lançamento Nexo One", client: "Nexo", status: "Aguardando cliente", progress: 38, due: "30 jul", sla: "2h restantes", health: "Em risco", tone: "orange", team: ["CS", "RF", "LA"] },
    { name: "Always-on Social", client: "Lumina", status: "Agendado", progress: 86, due: "Contínuo", sla: "Dentro do SLA", health: "Saudável", tone: "green", team: ["LA", "NT"] },
    { name: "Campanha Bio Performance", client: "BioAtiva", status: "Alterações", progress: 64, due: "Hoje", sla: "45 min restantes", health: "Em risco", tone: "orange", team: ["RF", "JM"] },
  ];

  const taskStages = [
    { label: "Briefing", count: 18, percent: 42, tone: "slate" },
    { label: "Em produção", count: 46, percent: 91, tone: "blue" },
    { label: "Revisão interna", count: 21, percent: 56, tone: "cyan" },
    { label: "Aguardando cliente", count: 17, percent: 48, tone: "yellow" },
    { label: "Alterações", count: 12, percent: 35, tone: "orange" },
    { label: "Aprovado", count: 28, percent: 68, tone: "green" },
    { label: "Agendado", count: 24, percent: 62, tone: "blue" },
    { label: "Atrasadas", count: 14, percent: 39, tone: "red" },
  ];

  const throughput = [
    { day: "Seg", planned: 34, delivered: 30 },
    { day: "Ter", planned: 38, delivered: 36 },
    { day: "Qua", planned: 31, delivered: 27 },
    { day: "Qui", planned: 42, delivered: 32 },
    { day: "Sex", planned: 36, delivered: 21 },
    { day: "Sáb", planned: 12, delivered: 8 },
    { day: "Dom", planned: 6, delivered: 4 },
  ];

  const team = [
    { name: "Júlia Martins", role: "Design", initials: "JM", color: "violet", capacity: 96, tasks: 18, overdue: 3, focus: "Vitta · OCA" },
    { name: "Caio Souza", role: "Tráfego pago", initials: "CS", color: "blue", capacity: 88, tasks: 14, overdue: 1, focus: "Nexo · BioAtiva" },
    { name: "Lia Andrade", role: "Social Media", initials: "LA", color: "peach", capacity: 74, tasks: 21, overdue: 0, focus: "Lumina · Vitta" },
    { name: "Rafael Freire", role: "Vídeo", initials: "RF", color: "green", capacity: 62, tasks: 9, overdue: 2, focus: "Nexo · BioAtiva" },
    { name: "Nina Torres", role: "Copy", initials: "NT", color: "orange", capacity: 81, tasks: 12, overdue: 0, focus: "OCA · Lumina" },
  ];

  const slaMetrics = [
    { label: "Primeiro retorno", value: 96, target: "Meta 95%", tone: "green" },
    { label: "Entrega no prazo", value: 88, target: "Meta 92%", tone: "orange" },
    { label: "Aprovação", value: 79, target: "Meta 85%", tone: "red" },
    { label: "Correções", value: 93, target: "Meta 90%", tone: "blue" },
  ];

  const clientRisks = [
    { name: "OCA", issue: "2 entregas fora do SLA", score: "Crítico", tone: "red", value: 92 },
    { name: "BioAtiva", issue: "4 solicitações em 24h", score: "Alto", tone: "orange", value: 76 },
    { name: "Nexo", issue: "Aprovação parada há 3 dias", score: "Médio", tone: "yellow", value: 58 },
    { name: "Lumina", issue: "Baixa interação no mês", score: "Atenção", tone: "blue", value: 41 },
  ];

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesClient = client === "Todos os clientes" || project.client === client;
        const matchesRisk = !riskOnly || project.tone === "red" || project.tone === "orange";
        return matchesClient && matchesRisk;
      }),
    [client, riskOnly],
  );

  const kpis = client === "Todos os clientes"
    ? [
        { label: "Projetos ativos", value: "28", helper: "5 exigem atenção", trend: "+3", icon: "◇", tone: "blue" },
        { label: "Tarefas abertas", value: "186", helper: "46 em produção", trend: "+12", icon: "✓", tone: "blue" },
        { label: "Em atraso", value: "14", helper: "7,5% do total", trend: "+4", icon: "!", tone: "red" },
        { label: "Bloqueadas", value: "6", helper: "3 dependem do cliente", trend: "−2", icon: "⊘", tone: "orange" },
        { label: "SLA cumprido", value: "91,7%", helper: "Meta geral de 95%", trend: "−1,8", icon: "◷", tone: "yellow" },
        { label: "Aprovações", value: "17", helper: "6 há mais de 48h", trend: "+5", icon: "⌁", tone: "green" },
      ]
    : [
        { label: "Projetos ativos", value: "4", helper: `Carteira ${client}`, trend: "0", icon: "◇", tone: "blue" },
        { label: "Tarefas abertas", value: "32", helper: "9 em produção", trend: "+3", icon: "✓", tone: "blue" },
        { label: "Em atraso", value: "3", helper: "9,3% do total", trend: "+1", icon: "!", tone: "red" },
        { label: "Bloqueadas", value: "2", helper: "Aguardando retorno", trend: "0", icon: "⊘", tone: "orange" },
        { label: "SLA cumprido", value: "89,4%", helper: "Meta contratual 95%", trend: "−2,6", icon: "◷", tone: "yellow" },
        { label: "Aprovações", value: "5", helper: "2 há mais de 48h", trend: "+2", icon: "⌁", tone: "green" },
      ];

  const updateFilter = (setter: (value: string) => void, value: string, label: string) => {
    setter(value);
    onToast(`${label}: ${value}`);
  };

  return (
    <section className="manager-dashboard" aria-label="Painel operacional do gestor">
      <header className="manager-heading">
        <div>
          <span className="manager-kicker"><i /> VISÃO OPERACIONAL EM TEMPO REAL</span>
          <h1>Painel do gestor</h1>
          <p>Projetos, entregas, equipe e SLAs de toda a agência em uma única visão.</p>
        </div>
        <div className="manager-heading-actions">
          <span className="manager-live"><i /> Atualizado agora</span>
          <button onClick={() => onToast("Relatório executivo preparado")}><span>↗</span> Exportar visão</button>
        </div>
      </header>

      <div className="manager-filter-bar">
        <div className="manager-view-tabs">
          <button className={!riskOnly ? "active" : ""} onClick={() => setRiskOnly(false)}>Visão geral</button>
          <button className={riskOnly ? "active risk" : ""} onClick={() => setRiskOnly(true)}>Somente riscos <span>5</span></button>
        </div>
        <div className="manager-selects">
          <label>
            <span>Período</span>
            <select value={period} onChange={(event) => updateFilter(setPeriod, event.target.value, "Período")}>
              <option>Hoje</option><option>Esta semana</option><option>Este mês</option><option>Últimos 30 dias</option>
            </select>
          </label>
          <label>
            <span>Cliente</span>
            <select value={client} onChange={(event) => updateFilter(setClient, event.target.value, "Cliente")}>
              <option>Todos os clientes</option><option>Vitta</option><option>OCA</option><option>Nexo</option><option>Lumina</option><option>BioAtiva</option>
            </select>
          </label>
          <label>
            <span>Equipe</span>
            <select value={teamFilter} onChange={(event) => updateFilter(setTeamFilter, event.target.value, "Equipe")}>
              <option>Todas as equipes</option><option>Criação</option><option>Conteúdo</option><option>Tráfego</option><option>Audiovisual</option>
            </select>
          </label>
        </div>
      </div>

      <section className="manager-kpi-grid" aria-label="Indicadores operacionais">
        {kpis.map((kpi) => (
          <button className={`manager-kpi-card manager-tone-${kpi.tone}`} key={kpi.label} onClick={() => onToast(`${kpi.label} detalhado`)}>
            <span className="manager-kpi-icon">{kpi.icon}</span>
            <span className="manager-kpi-trend">{kpi.trend}</span>
            <small>{kpi.label}</small>
            <strong>{kpi.value}</strong>
            <p>{kpi.helper}</p>
          </button>
        ))}
      </section>

      <section className="manager-flow-grid">
        <article className="manager-panel task-stage-panel">
          <div className="manager-panel-header">
            <div><span>FLUXO DE PRODUÇÃO</span><h2>Tarefas por etapa</h2></div>
            <button onClick={() => onToast("Kanban operacional aberto")}>Abrir Kanban <b>→</b></button>
          </div>
          <div className="manager-stage-grid">
            {taskStages.map((stage) => (
              <button key={stage.label} className={`manager-stage-card stage-tone-${stage.tone}`} onClick={() => onToast(`${stage.count} tarefas em ${stage.label}`)}>
                <span><i /><small>{stage.label}</small></span>
                <strong>{stage.count}</strong>
                <div><i style={{ width: `${stage.percent}%` }} /></div>
              </button>
            ))}
          </div>
          <div className="manager-stage-summary">
            <span><i className="blue" />180 tarefas no fluxo</span>
            <span><i className="yellow" />17 aguardando cliente</span>
            <span><i className="red" />14 atrasadas</span>
          </div>
        </article>

        <article className="manager-panel throughput-panel">
          <div className="manager-panel-header">
            <div><span>RITMO DA OPERAÇÃO</span><h2>Planejado × entregue</h2></div>
            <em>84% realizado</em>
          </div>
          <div className="throughput-chart" aria-label="Entregas planejadas e realizadas por dia">
            {throughput.map((item) => (
              <div className="throughput-day" key={item.day}>
                <span className="throughput-bars">
                  <i className="planned" style={{ height: `${item.planned * 1.7}px` }} />
                  <i className="delivered" style={{ height: `${item.delivered * 1.7}px` }} />
                </span>
                <small>{item.day}</small>
              </div>
            ))}
          </div>
          <div className="throughput-legend">
            <span><i className="planned" />Planejado 199</span>
            <span><i className="delivered" />Entregue 158</span>
            <strong>−41 tarefas</strong>
          </div>
        </article>
      </section>

      <section className="manager-project-insight-grid">
        <article className="manager-panel manager-projects-panel">
          <div className="manager-panel-header">
            <div><span>CARTEIRA OPERACIONAL</span><h2>Saúde dos projetos</h2></div>
            <button onClick={() => onToast("Todos os projetos abertos")}>Ver todos <b>→</b></button>
          </div>
          <div className="manager-project-table">
            <div className="manager-project-row project-table-head">
              <span>Projeto / cliente</span><span>Status</span><span>Progresso</span><span>Prazo</span><span>SLA</span><span>Saúde</span><span />
            </div>
            {filteredProjects.map((project) => (
              <button className="manager-project-row" key={project.name} onClick={() => onToast(`${project.name} aberto`)}>
                <span className="manager-project-name">
                  <i>{project.client.slice(0, 1)}</i>
                  <span><strong>{project.name}</strong><small>{project.client}</small></span>
                </span>
                <span className="manager-project-status">{project.status}</span>
                <span className="manager-project-progress"><i><b style={{ width: `${project.progress}%` }} /></i><em>{project.progress}%</em></span>
                <span>{project.due}</span>
                <span className={`manager-sla-text sla-${project.tone}`}>{project.sla}</span>
                <span className={`manager-health health-${project.tone}`}><i />{project.health}</span>
                <span className="row-arrow">›</span>
              </button>
            ))}
          </div>
        </article>

        <article className="manager-insight-card">
          <div className="manager-insight-top"><span>✦</span><small>AGENCY AI · GESTÃO</small></div>
          <h2>3 decisões podem recuperar 27h da operação nesta semana.</h2>
          <ul>
            <li><i>1</i><span><strong>Redistribuir design</strong><small>Júlia está com 96% de ocupação.</small></span></li>
            <li><i>2</i><span><strong>Escalar aprovação da Nexo</strong><small>Projeto parado há 3 dias.</small></span></li>
            <li><i>3</i><span><strong>Repriorizar audiovisual</strong><small>2 tarefas vencidas hoje.</small></span></li>
          </ul>
          <button onClick={() => onToast("Plano de ação do gestor gerado")}>Gerar plano de ação <span>→</span></button>
        </article>
      </section>

      <section className="manager-bottom-grid">
        <article className="manager-panel manager-team-panel">
          <div className="manager-panel-header">
            <div><span>CAPACIDADE</span><h2>Carga dos colaboradores</h2></div>
            <button onClick={() => onToast("Workload completo aberto")}>Ver workload <b>→</b></button>
          </div>
          <div className="manager-team-list">
            {team.map((member) => (
              <button key={member.name} onClick={() => onToast(`Agenda de ${member.name} aberta`)}>
                <Avatar initials={member.initials} color={member.color} />
                <span className="manager-team-person"><strong>{member.name}</strong><small>{member.role} · {member.focus}</small></span>
                <span className="manager-capacity"><i><b className={member.capacity > 90 ? "over" : member.capacity > 80 ? "busy" : ""} style={{ width: `${member.capacity}%` }} /></i><em>{member.capacity}%</em></span>
                <span className="manager-team-tasks"><strong>{member.tasks}</strong><small>tarefas</small></span>
                <span className={`manager-overdue ${member.overdue ? "has-overdue" : ""}`}><strong>{member.overdue}</strong><small>atrasadas</small></span>
              </button>
            ))}
          </div>
          <button className="manager-panel-footer" onClick={() => onToast("Assistente de redistribuição aberto")}>Reequilibrar equipe automaticamente <span>→</span></button>
        </article>

        <article className="manager-panel manager-sla-panel">
          <div className="manager-panel-header">
            <div><span>QUALIDADE</span><h2>Indicadores de SLA</h2></div>
            <em>Meta geral 95%</em>
          </div>
          <div className="manager-sla-grid">
            {slaMetrics.map((metric) => (
              <button key={metric.label} onClick={() => onToast(`SLA de ${metric.label} aberto`)}>
                <span className={`sla-ring ring-${metric.tone}`} style={{ "--sla-value": `${metric.value * 3.6}deg` } as React.CSSProperties}><strong>{metric.value}%</strong></span>
                <span><strong>{metric.label}</strong><small>{metric.target}</small></span>
              </button>
            ))}
          </div>
          <div className="manager-sla-alert">
            <span>!</span><p><strong>4 violações nesta semana</strong><small>2 da OCA · 1 da BioAtiva · 1 da Nexo</small></p><button onClick={() => onToast("Violações de SLA abertas")}>Analisar</button>
          </div>
        </article>

        <article className="manager-panel manager-client-risk-panel">
          <div className="manager-panel-header">
            <div><span>RELACIONAMENTO</span><h2>Clientes que exigem atenção</h2></div>
            <span className="manager-risk-count">4</span>
          </div>
          <div className="manager-client-risk-list">
            {clientRisks.map((item) => (
              <button key={item.name} onClick={() => onToast(`Saúde do cliente ${item.name} aberta`)}>
                <span className={`manager-client-logo logo-${item.tone}`}>{item.name.slice(0, 1)}</span>
                <span><strong>{item.name}</strong><small>{item.issue}</small><i><b style={{ width: `${item.value}%` }} /></i></span>
                <em className={`risk-${item.tone}`}>{item.score}</em>
              </button>
            ))}
          </div>
          <button className="manager-panel-footer" onClick={() => onToast("Painel de saúde dos clientes aberto")}>Ver saúde de todos os clientes <span>→</span></button>
        </article>
      </section>
    </section>
  );
}

type ClientRecord = {
  id: number;
  name: string;
  segment: string;
  contact: string;
  email: string;
  health: number;
  status: "Ativo" | "Atenção" | "Onboarding" | "Em risco";
  services: string[];
  manager: string;
  managerInitials: string;
  lastInteraction: string;
  renewal: string;
  projects: number;
  openTasks: number;
  tone: string;
  origin?: "Brasil" | "Exterior";
  country?: string;
  phone?: string;
  document?: string;
};

const initialClients: ClientRecord[] = [
  { id: 1, name: "Academia BioAtiva", segment: "Saúde e bem-estar", contact: "Bianca Alves", email: "bianca@bioativa.com.br", health: 94, status: "Ativo", services: ["Social Media", "Meta Ads"], manager: "Marina Rocha", managerInitials: "MR", lastInteraction: "há 8 min", renewal: "18 set. 2026", projects: 4, openTasks: 12, tone: "blue" },
  { id: 2, name: "Clínica Harmonia", segment: "Saúde", contact: "Dra. Camila Melo", email: "camila@harmonia.com.br", health: 72, status: "Atenção", services: ["Social Media", "Google Ads"], manager: "Caio Souza", managerInitials: "CS", lastInteraction: "há 2h", renewal: "12 ago. 2026", projects: 3, openTasks: 8, tone: "violet" },
  { id: 3, name: "Construtora Alfa", segment: "Construção civil", contact: "Ricardo Freitas", email: "ricardo@alfa.com.br", health: 88, status: "Ativo", services: ["Branding", "Vídeo"], manager: "Júlia Martins", managerInitials: "JM", lastInteraction: "ontem", renewal: "03 out. 2026", projects: 5, openTasks: 17, tone: "orange" },
  { id: 4, name: "Loja XPTO", segment: "E-commerce", contact: "Amanda Nunes", email: "amanda@lojaxpto.com.br", health: 48, status: "Em risco", services: ["Google Ads", "Meta Ads"], manager: "Caio Souza", managerInitials: "CS", lastInteraction: "há 8 dias", renewal: "28 ago. 2026", projects: 2, openTasks: 6, tone: "red" },
  { id: 5, name: "Lumina Educação", segment: "Educação", contact: "Fernanda Luz", email: "fernanda@lumina.edu.br", health: 91, status: "Ativo", services: ["Conteúdo", "Social Media"], manager: "Lia Andrade", managerInitials: "LA", lastInteraction: "há 34 min", renewal: "21 nov. 2026", projects: 4, openTasks: 10, tone: "green" },
  { id: 6, name: "Nexo One", segment: "Tecnologia", contact: "Leonardo Reis", email: "leo@nexo.one", health: 84, status: "Ativo", services: ["Website", "Google Ads"], manager: "Marina Rocha", managerInitials: "MR", lastInteraction: "há 1h", renewal: "07 dez. 2026", projects: 6, openTasks: 21, tone: "blue" },
  { id: 7, name: "Mori Café", segment: "Alimentação", contact: "Helena Mori", email: "helena@moricafe.com.br", health: 78, status: "Onboarding", services: ["Branding", "Social Media"], manager: "Júlia Martins", managerInitials: "JM", lastInteraction: "hoje", renewal: "Novo contrato", projects: 2, openTasks: 7, tone: "yellow" },
  { id: 8, name: "Orbe Arquitetura", segment: "Arquitetura", contact: "Paulo Neri", email: "paulo@orbearq.com.br", health: 69, status: "Atenção", services: ["Conteúdo", "Website"], manager: "Lia Andrade", managerInitials: "LA", lastInteraction: "há 3 dias", renewal: "05 set. 2026", projects: 3, openTasks: 9, tone: "violet" },
];

const internationalDialCodes = [
  { iso: "US", flag: "🇺🇸", name: "Estados Unidos", dial: "+1", mask: "(###) ###-####" },
  { iso: "CA", flag: "🇨🇦", name: "Canadá", dial: "+1", mask: "(###) ###-####" },
  { iso: "PT", flag: "🇵🇹", name: "Portugal", dial: "+351", mask: "### ### ###" },
  { iso: "GB", flag: "🇬🇧", name: "Reino Unido", dial: "+44", mask: "#### ### ####" },
  { iso: "ES", flag: "🇪🇸", name: "Espanha", dial: "+34", mask: "### ### ###" },
  { iso: "FR", flag: "🇫🇷", name: "França", dial: "+33", mask: "# ## ## ## ##" },
  { iso: "DE", flag: "🇩🇪", name: "Alemanha", dial: "+49", mask: "#### ########" },
  { iso: "IT", flag: "🇮🇹", name: "Itália", dial: "+39", mask: "### ### ####" },
  { iso: "NL", flag: "🇳🇱", name: "Países Baixos", dial: "+31", mask: "## ### ####" },
  { iso: "CH", flag: "🇨🇭", name: "Suíça", dial: "+41", mask: "## ### ## ##" },
  { iso: "IE", flag: "🇮🇪", name: "Irlanda", dial: "+353", mask: "## ### ####" },
  { iso: "AR", flag: "🇦🇷", name: "Argentina", dial: "+54", mask: "## #### ####" },
  { iso: "CL", flag: "🇨🇱", name: "Chile", dial: "+56", mask: "# #### ####" },
  { iso: "UY", flag: "🇺🇾", name: "Uruguai", dial: "+598", mask: "# ### ## ##" },
  { iso: "PY", flag: "🇵🇾", name: "Paraguai", dial: "+595", mask: "### ### ###" },
  { iso: "MX", flag: "🇲🇽", name: "México", dial: "+52", mask: "## #### ####" },
  { iso: "CO", flag: "🇨🇴", name: "Colômbia", dial: "+57", mask: "### ### ####" },
  { iso: "PE", flag: "🇵🇪", name: "Peru", dial: "+51", mask: "### ### ###" },
  { iso: "AO", flag: "🇦🇴", name: "Angola", dial: "+244", mask: "### ### ###" },
  { iso: "MZ", flag: "🇲🇿", name: "Moçambique", dial: "+258", mask: "## ### ####" },
  { iso: "CV", flag: "🇨🇻", name: "Cabo Verde", dial: "+238", mask: "### ## ##" },
  { iso: "IN", flag: "🇮🇳", name: "Índia", dial: "+91", mask: "##### #####" },
  { iso: "AE", flag: "🇦🇪", name: "Emirados Árabes", dial: "+971", mask: "## ### ####" },
  { iso: "AU", flag: "🇦🇺", name: "Austrália", dial: "+61", mask: "### ### ###" },
  { iso: "JP", flag: "🇯🇵", name: "Japão", dial: "+81", mask: "## #### ####" },
  { iso: "OTHER", flag: "🌐", name: "Outro país", dial: "+", mask: "### ### ### ###" },
] as const;

function formatBrazilianDocument(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatBrazilianPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function formatInternationalPhone(value: string, mask: string) {
  const digits = value.replace(/\D/g, "").slice(0, 18);
  let output = "";
  let digitIndex = 0;
  for (const character of mask) {
    if (character === "#") {
      if (digitIndex >= digits.length) break;
      output += digits[digitIndex++];
    } else if (digits.length > 0 && digitIndex < digits.length) {
      output += character;
    }
  }
  if (digitIndex < digits.length) output += ` ${digits.slice(digitIndex)}`;
  return output;
}

function ClientsWorkspace({ onToast }: { onToast: (message: string) => void }) {
  const [clients, setClients] = useState(initialClients);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(["Social Media"]);
  const [form, setForm] = useState({ company: "", segment: "", contact: "", email: "", phone: "", document: "", clientOrigin: "br", phoneCountry: "US", customDialCode: "+1", status: "Onboarding", manager: "Marina Rocha" });
  const isForeignClient = form.clientOrigin === "foreign";
  const selectedPhoneCountry = internationalDialCodes.find((country) => country.iso === form.phoneCountry) ?? internationalDialCodes[0];

  const visibleClients = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return clients.filter((client) => {
      const matchesQuery = !normalized || `${client.name} ${client.contact} ${client.segment} ${client.email}`.toLocaleLowerCase("pt-BR").includes(normalized);
      const matchesFilter = filter === "Todos" || client.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [clients, filter, query]);

  const activeCount = clients.filter((client) => client.status === "Ativo").length + 14;
  const attentionCount = clients.filter((client) => client.status === "Atenção" || client.status === "Em risco").length;
  const activeProjects = clients.reduce((sum, client) => sum + client.projects, 18);

  useEffect(() => {
    if (!createOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCreateOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [createOpen]);

  const toggleService = (service: string) => {
    setSelectedServices((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  };

  const resetForm = () => {
    setForm({ company: "", segment: "", contact: "", email: "", phone: "", document: "", clientOrigin: "br", phoneCountry: "US", customDialCode: "+1", status: "Onboarding", manager: "Marina Rocha" });
    setSelectedServices(["Social Media"]);
  };

  const submitClient = () => {
    const managerInitials = form.manager.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    const newClient: ClientRecord = {
      id: Date.now(),
      name: form.company,
      segment: form.segment || "Segmento não informado",
      contact: form.contact,
      email: form.email,
      health: 82,
      status: form.status as ClientRecord["status"],
      services: selectedServices.length ? selectedServices : ["A definir"],
      manager: form.manager,
      managerInitials,
      lastInteraction: "agora",
      renewal: "Novo contrato",
      projects: 0,
      openTasks: 0,
      tone: "blue",
      origin: isForeignClient ? "Exterior" : "Brasil",
      country: isForeignClient ? selectedPhoneCountry.name : "Brasil",
      phone: form.phone ? (isForeignClient ? `${form.phoneCountry === "OTHER" ? form.customDialCode : selectedPhoneCountry.dial} ${form.phone}`.trim() : `+55 ${form.phone}`.trim()) : "",
      document: form.document,
    };
    setClients((current) => [newClient, ...current]);
    setFilter("Todos");
    setQuery("");
    setCreateOpen(false);
    resetForm();
    onToast(`${newClient.name} cadastrado com sucesso`);
  };

  const filters = ["Todos", "Ativo", "Atenção", "Onboarding", "Em risco"];

  return (
    <section className="clients-workspace" aria-label="Gestão de clientes">
      <header className="clients-heading">
        <div>
          <span className="clients-eyebrow"><i /> CARTEIRA DE CLIENTES</span>
          <h1>Clientes</h1>
          <p>Relacionamentos, contratos e oportunidades em uma visão única.</p>
        </div>
        <div className="clients-heading-actions">
          <button className="clients-import-button" onClick={() => onToast("Importador de clientes aberto")}><span>⇧</span> Importar</button>
          <button className="clients-new-button" onClick={() => setCreateOpen(true)}><span>+</span> Novo cliente</button>
        </div>
      </header>

      <section className="clients-kpis" aria-label="Resumo da carteira">
        <article className="client-kpi-card kpi-active">
          <span className="client-kpi-icon">◎</span>
          <div><small>Clientes ativos</small><strong>{activeCount}</strong><em><b>+2</b> neste mês</em></div>
        </article>
        <article className="client-kpi-card kpi-projects">
          <span className="client-kpi-icon">◇</span>
          <div><small>Projetos ativos</small><strong>{activeProjects}</strong><em><b>6</b> em revisão esta semana</em></div>
        </article>
        <article className="client-kpi-card kpi-renewal">
          <span className="client-kpi-icon">↻</span>
          <div><small>Próximas renovações</small><strong>6</strong><em>nos próximos 60 dias</em></div>
        </article>
        <article className="client-kpi-card kpi-attention">
          <span className="client-kpi-icon">!</span>
          <div><small>Exigem atenção</small><strong>{attentionCount}</strong><em><b>Ação recomendada</b></em></div>
        </article>
      </section>

      <section className="clients-layout">
        <article className="clients-directory-card">
          <div className="clients-toolbar">
            <label className="clients-search">
              <span aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por cliente, contato ou segmento..." aria-label="Buscar clientes" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="clients-filter-button" onClick={() => onToast("Filtros avançados abertos")}><span>≡</span> Filtros</button>
          </div>

          <div className="clients-tabs" role="tablist" aria-label="Filtrar clientes por status">
            {filters.map((item) => (
              <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
                {item}
                <span>{item === "Todos" ? clients.length + 16 : clients.filter((client) => client.status === item).length}</span>
              </button>
            ))}
          </div>

          <div className="clients-table">
            <div className="clients-table-row clients-table-head">
              <span>Cliente</span><span>Saúde</span><span>Serviços</span><span>Responsável</span><span>Atividade</span><span>Renovação</span><span />
            </div>
            {visibleClients.map((client) => (
              <button className="clients-table-row" key={client.id} onClick={() => onToast(`Perfil de ${client.name} aberto`)}>
                <span className="client-company-cell">
                  <i className={`client-company-logo tone-${client.tone}`}>{client.name.slice(0, 2).toUpperCase()}</i>
                  <span><strong>{client.name}</strong><small>{client.contact} · {client.segment}</small></span>
                </span>
                <span className="client-health-cell">
                  <span className={`client-health-score health-${client.health >= 85 ? "good" : client.health >= 65 ? "watch" : "risk"}`}>{client.health}</span>
                  <span><i style={{ width: `${client.health}%` }} /></span>
                </span>
                <span className="client-service-cell">
                  {client.services.slice(0, 2).map((service) => <em key={service}>{service}</em>)}
                  {client.services.length > 2 && <b>+{client.services.length - 2}</b>}
                </span>
                <span className="client-manager-cell"><Avatar initials={client.managerInitials} color="soft" size="sm" /><span><strong>{client.manager}</strong><small>{client.projects} projetos · {client.openTasks} tarefas</small></span></span>
                <strong className="client-activity-cell"><i /><span>{client.lastInteraction}</span><small>Último contato</small></strong>
                <span className="client-renewal-cell"><strong>{client.renewal}</strong><em className={`client-status status-${client.status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}>{client.status}</em></span>
                <span className="client-row-menu">•••</span>
              </button>
            ))}
            {visibleClients.length === 0 && (
              <div className="clients-empty"><span>⌕</span><strong>Nenhum cliente encontrado</strong><p>Ajuste a busca ou selecione outro status.</p></div>
            )}
          </div>
          <footer className="clients-directory-footer"><span>Exibindo {visibleClients.length} de {clients.length + 16} clientes</span><button onClick={() => onToast("Próxima página carregada")}>Próxima <span>→</span></button></footer>
        </article>

        <aside className="clients-insights-column">
          <article className="client-health-card">
            <div className="client-side-head"><span><small>VISÃO DA CARTEIRA</small><h2>Saúde dos clientes</h2></span><button aria-label="Mais opções">•••</button></div>
            <div className="portfolio-health">
              <div className="portfolio-health-ring"><span><strong>87</strong><small>/100</small></span></div>
              <div><strong>Carteira saudável</strong><p>A satisfação e a recorrência permanecem acima da meta.</p><em>+4 pontos no mês</em></div>
            </div>
            <div className="health-distribution">
              <span><i className="good" /><strong>Saudáveis</strong><b>18</b></span>
              <span><i className="watch" /><strong>Atenção</strong><b>4</b></span>
              <span><i className="risk" /><strong>Em risco</strong><b>2</b></span>
            </div>
          </article>

          <article className="client-actions-card">
            <div className="client-side-head"><span><small>PRÓXIMOS PASSOS</small><h2>Ações importantes</h2></span><em>4</em></div>
            <button onClick={() => onToast("Renovação da Clínica Harmonia aberta")}><i className="action-calendar">12</i><span><strong>Renovar contrato</strong><small>Clínica Harmonia · 12 ago.</small></span><b>→</b></button>
            <button onClick={() => onToast("Plano de contato da Loja XPTO aberto")}><i className="action-alert">!</i><span><strong>Retomar relacionamento</strong><small>Loja XPTO · 8 dias sem interação</small></span><b>→</b></button>
            <button onClick={() => onToast("Reunião de Lumina Educação aberta")}><i className="action-meeting">◷</i><span><strong>Reunião de resultado</strong><small>Lumina Educação · amanhã</small></span><b>→</b></button>
            <button className="client-actions-footer" onClick={() => onToast("Todas as ações abertas")}>Ver todas as ações <span>→</span></button>
          </article>

          <article className="client-iq-card">
            <span className="client-iq-brand">✦ QORVO IQ</span>
            <strong>3 clientes reduziram a interação nos últimos 14 dias.</strong>
            <p>Recomendo antecipar um contato antes que isso afete a renovação.</p>
            <button onClick={() => onToast("Análise inteligente da carteira aberta")}>Ver análise <span>→</span></button>
          </article>
        </aside>
      </section>

      {createOpen && (
        <div className="client-create-backdrop" onMouseDown={() => setCreateOpen(false)}>
          <form className="client-create-modal" onSubmit={(event) => { event.preventDefault(); submitClient(); }} onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div><span>NOVO CLIENTE</span><h2>Cadastrar cliente</h2><p>Comece com as informações essenciais. O restante pode ser completado depois.</p></div>
              <button type="button" onClick={() => setCreateOpen(false)} aria-label="Fechar cadastro">×</button>
            </header>
            <div className="client-form-scroll">
              <section className="client-form-section">
                <div className="client-form-section-title"><span>01</span><div><strong>Empresa</strong><small>Identificação e segmento</small></div></div>
                <div className="client-form-grid">
                  <div className="client-origin-field">
                    <span>Origem do cliente *</span>
                    <div role="group" aria-label="Escolher origem do cliente">
                      <button type="button" className={!isForeignClient ? "selected" : ""} aria-pressed={!isForeignClient} onClick={() => setForm({ ...form, clientOrigin: "br", phone: "", document: "" })}><i>🇧🇷</i><b>Brasileiro</b><small>CPF ou CNPJ</small></button>
                      <button type="button" className={isForeignClient ? "selected" : ""} aria-pressed={isForeignClient} onClick={() => setForm({ ...form, clientOrigin: "foreign", phone: "", document: "" })}><i>🌎</i><b>Estrangeiro</b><small>Documento internacional</small></button>
                    </div>
                  </div>
                  <label className="span-two"><span>Nome da empresa *</span><input required value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="Ex.: Qorvo Growth Marketing" /></label>
                  <label><span>{isForeignClient ? "Documento de identificação" : "CNPJ ou CPF"}</span><input value={form.document} onChange={(event) => setForm({ ...form, document: isForeignClient ? event.target.value.slice(0, 48) : formatBrazilianDocument(event.target.value) })} placeholder={isForeignClient ? "Ex.: AB-123.456/X" : "00.000.000/0001-00"} maxLength={isForeignClient ? 48 : 18} autoCapitalize="characters" /><small className="client-field-helper">{isForeignClient ? "Aceita letras, números, pontos, traços e caracteres especiais." : "A máscara se adapta automaticamente para CPF ou CNPJ."}</small></label>
                  <label><span>Segmento</span><input value={form.segment} onChange={(event) => setForm({ ...form, segment: event.target.value })} placeholder="Ex.: Saúde e bem-estar" /></label>
                </div>
              </section>
              <section className="client-form-section">
                <div className="client-form-section-title"><span>02</span><div><strong>Contato principal</strong><small>Quem receberá aprovações e relatórios</small></div></div>
                <div className="client-form-grid">
                  <label><span>Nome do contato *</span><input required value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="Nome e sobrenome" /></label>
                  <label><span>E-mail *</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="contato@empresa.com.br" /></label>
                  <label className="span-two"><span>Telefone / WhatsApp</span><div className={`client-phone-field ${isForeignClient ? "international" : "brazilian"}`}>{isForeignClient ? <><select aria-label="País e código internacional" value={form.phoneCountry} onChange={(event) => setForm({ ...form, phoneCountry: event.target.value, phone: "" })}>{internationalDialCodes.map((country) => <option key={country.iso} value={country.iso}>{country.flag} {country.dial} · {country.name}</option>)}</select>{form.phoneCountry === "OTHER" && <input className="client-custom-ddi" aria-label="Código internacional do país" value={form.customDialCode} onChange={(event) => { const digits = event.target.value.replace(/\D/g, "").slice(0, 4); setForm({ ...form, customDialCode: digits ? `+${digits}` : "+" }); }} placeholder="+000" inputMode="tel" />}</> : <span className="client-fixed-dial" aria-label="Brasil, código mais cinquenta e cinco">🇧🇷 <b>+55</b></span>}<input className="client-phone-input" value={form.phone} onChange={(event) => setForm({ ...form, phone: isForeignClient ? formatInternationalPhone(event.target.value, selectedPhoneCountry.mask) : formatBrazilianPhone(event.target.value) })} placeholder={isForeignClient ? selectedPhoneCountry.mask.replaceAll("#", "0") : "(00) 00000-0000"} inputMode="tel" autoComplete="tel-national" /></div><small className="client-field-helper">{isForeignClient ? `${selectedPhoneCountry.flag} ${selectedPhoneCountry.name} · código ${form.phoneCountry === "OTHER" ? form.customDialCode : selectedPhoneCountry.dial}` : "Número brasileiro com DDI +55 e máscara automática."}</small></label>
                </div>
              </section>
              <section className="client-form-section">
                <div className="client-form-section-title"><span>03</span><div><strong>Operação inicial</strong><small>Responsável, status e serviços contratados</small></div></div>
                <div className="client-form-grid">
                  <label><span>Status inicial</span><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Onboarding</option><option>Ativo</option><option>Atenção</option></select></label>
                  <label><span>Gestor da conta</span><select value={form.manager} onChange={(event) => setForm({ ...form, manager: event.target.value })}><option>Marina Rocha</option><option>Caio Souza</option><option>Júlia Martins</option><option>Lia Andrade</option></select></label>
                </div>
                <div className="client-service-picker"><span>Serviços contratados</span><div>{["Social Media", "Meta Ads", "Google Ads", "Branding", "Website", "Vídeo"].map((service) => <button type="button" key={service} aria-pressed={selectedServices.includes(service)} className={selectedServices.includes(service) ? "selected" : ""} onClick={() => toggleService(service)}><i>{selectedServices.includes(service) ? "✓" : "+"}</i>{service}</button>)}</div></div>
              </section>
            </div>
            <footer><button type="button" onClick={() => setCreateOpen(false)}>Cancelar</button><button type="submit">Cadastrar cliente <span>→</span></button></footer>
          </form>
        </div>
      )}
    </section>
  );
}

function ModuleWorkspace({
  active,
  onToast,
}: {
  active: string;
  onToast: (message: string) => void;
}) {
  if (active === "Painel do gestor") {
    return <ManagerDashboardModern onToast={onToast} />;
  }

  if (active === "Clientes") {
    return <ClientsWorkspace onToast={onToast} />;
  }

  const financeLike = active === "Financeiro" || active === "Relatórios";
  const crmLike = active === "CRM";
  return (
    <>
      <ModuleHeader active={active} onToast={onToast} />
      {financeLike ? (
        <FinanceWorkspace onToast={onToast} />
      ) : active === "Equipe" ? (
        <TeamWorkspace onToast={onToast} />
      ) : crmLike ? (
        <CrmWorkspace onToast={onToast} />
      ) : (
        <OperationsWorkspace active={active} onToast={onToast} />
      )}
    </>
  );
}

function SearchModal({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (label: string) => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      [
        { title: "Campanha Viva o Agora", meta: "Projeto · Vitta", icon: "◇", destination: "Projetos" },
        { title: "Carrossel Dia do Bem-estar", meta: "Aprovação · Vitta", icon: "⌁", destination: "Aprovações" },
        { title: "Landing Page Nexo One", meta: "Tarefa · Nexo", icon: "✓", destination: "Tarefas" },
        { title: "Mori Café", meta: "Lead · Reunião", icon: "↗", destination: "CRM" },
      ].filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="search-modal" role="dialog" aria-modal="true" aria-label="Busca global" onMouseDown={(event) => event.stopPropagation()}>
        <div className="search-input-row">
          <span className="search-symbol" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque clientes, projetos, tarefas ou mensagens..."
            aria-label="Busca global"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="search-results">
          <p>{query ? "RESULTADOS" : "ACESSOS RÁPIDOS"}</p>
          {results.map((result) => (
            <button
              key={result.title}
              onClick={() => {
                onNavigate(result.destination);
                onClose();
              }}
            >
              <span>{result.icon}</span>
              <span><strong>{result.title}</strong><small>{result.meta}</small></span>
              <kbd>↵</kbd>
            </button>
          ))}
          {results.length === 0 && <div className="empty-search">Nenhum resultado encontrado.</div>}
        </div>
        <div className="search-footer">
          <span><kbd>↑↓</kbd> navegar</span>
          <span><kbd>↵</kbd> abrir</span>
          <span><kbd>esc</kbd> fechar</span>
        </div>
      </div>
    </div>
  );
}

function CreateMenu({
  open,
  onClose,
  onToast,
}: {
  open: boolean;
  onClose: () => void;
  onToast: (message: string) => void;
}) {
  if (!open) return null;
  const actions = [
    { label: "Nova tarefa", helper: "Organize uma nova entrega", icon: "✓" },
    { label: "Novo projeto", helper: "Comece a operação de um cliente", icon: "◇" },
    { label: "Novo cliente", helper: "Cadastre e faça o onboarding", icon: "◎" },
    { label: "Nova oportunidade", helper: "Adicione um lead ao CRM", icon: "↗" },
  ];
  return (
    <>
      <button className="floating-backdrop" onClick={onClose} aria-label="Fechar menu de criação" />
      <div className="create-menu">
        <p>CRIAR NOVO</p>
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => {
              onToast(`${action.label} iniciada`);
              onClose();
            }}
          >
            <span>{action.icon}</span>
            <span><strong>{action.label}</strong><small>{action.helper}</small></span>
          </button>
        ))}
      </div>
    </>
  );
}

function NotificationPanel({
  open,
  onClose,
  onToast,
}: {
  open: boolean;
  onClose: () => void;
  onToast: (message: string) => void;
}) {
  return (
    <>
      <button className={`drawer-backdrop ${open ? "visible" : ""}`} onClick={onClose} aria-label="Fechar notificações" tabIndex={open ? 0 : -1} />
      <aside className={`notification-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-header">
          <div><h2>Notificações</h2><span>5 novas</span></div>
          <button onClick={onClose} aria-label="Fechar notificações">×</button>
        </div>
        <div className="notification-tabs">
          <button className="active">Todas</button><button>Menções</button><button>Alertas</button>
        </div>
        <div className="notification-list">
          {[
            { icon: "⌁", tone: "orange", title: "Vitta solicitou alterações", copy: "Carrossel Dia do Bem-estar", time: "há 8 min" },
            { icon: "✓", tone: "green", title: "Tarefa concluída por Júlia", copy: "KV Campanha Inverno", time: "há 24 min" },
            { icon: "◎", tone: "violet", title: "Capacidade acima do limite", copy: "Caio está com 88% da semana alocada", time: "há 1h" },
            { icon: "R$", tone: "blue", title: "Pagamento confirmado", copy: "OCA · Mensalidade de julho", time: "há 2h" },
          ].map((note) => (
            <button key={note.title} onClick={() => onToast(note.title)}>
              <span className={`note-icon ${note.tone}`}>{note.icon}</span>
              <span><strong>{note.title}</strong><small>{note.copy}</small><em>{note.time}</em></span>
              <i />
            </button>
          ))}
        </div>
        <button className="drawer-footer" onClick={() => onToast("Todas as notificações marcadas como lidas")}>Marcar tudo como lido</button>
      </aside>
    </>
  );
}

export default function Home() {
  const [active, setActive] = useState("Visão geral");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("wing-theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    window.localStorage.setItem("wing-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCreateOpen(false);
        setNotifyOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        onNavigate={setActive}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="app-main">
        <Topbar
          active={active}
          darkMode={darkMode}
          onTheme={() => setDarkMode((value) => !value)}
          onMenu={() => setMobileOpen(true)}
          onSearch={() => setSearchOpen(true)}
          onCreate={() => setCreateOpen((value) => !value)}
          onQuickAction={(label) => setToast(`${label} iniciado`)}
          onNotify={() => setNotifyOpen(true)}
        />
        <main className="content">
          {active === "Visão geral" ? (
            <DashboardOverview onToast={setToast} />
          ) : (
            <ModuleWorkspace active={active} onToast={setToast} />
          )}
        </main>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={setActive} />
      <CreateMenu open={createOpen} onClose={() => setCreateOpen(false)} onToast={setToast} />
      <NotificationPanel open={notifyOpen} onClose={() => setNotifyOpen(false)} onToast={setToast} />
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        <span>✓</span>
        {toast}
      </div>
    </div>
  );
}
