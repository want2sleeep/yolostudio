import React from 'react';
import Link from 'next/link';

// Web原生样式定义
const styles = {
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    display: 'flex' as const,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    height: 64,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  navLinks: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    gap: 24,
  },
  navLink: {
    color: '#4b5563',
    fontSize: 16,
    cursor: 'pointer',
    textDecoration: 'none' as const,
  },
  activeNavLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
};

export const Navigation: React.FC = () => {
  // 在实际应用中，这里可以根据当前路由设置活动状态
  return (
    <div style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>YOLOStudio</Link>
        <div style={styles.navLinks}>
          <Link href="/" style={{ ...styles.navLink, ...styles.activeNavLink }}>首页</Link>
          <Link href="/about" style={styles.navLink}>关于我们</Link>
          <Link href="/projects" style={styles.navLink}>项目</Link>
          <Link href="/activities" style={styles.navLink}>活动</Link>
          <Link href="/recruit" style={styles.navLink}>招新</Link>
          <Link href="/tools" style={styles.navLink}>工具箱</Link>
          <Link href="/contact" style={styles.navLink}>联系我们</Link>
        </div>
      </div>
    </div>
  );
};