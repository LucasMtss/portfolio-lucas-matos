import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AdminRoute } from './components/AdminRoute'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { AdminLoginRoute } from './pages/admin/AdminLoginRoute'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminEditorPage } from './pages/admin/AdminEditorPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
        </Route>

        <Route path="admin/login" element={<AdminLoginRoute />} />

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/posts/new" element={<AdminEditorPage />} />
          <Route path="admin/posts/:id/edit" element={<AdminEditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
