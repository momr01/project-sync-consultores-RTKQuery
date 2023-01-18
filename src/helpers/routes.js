const routes = {
  home: "/",
  admin: "/admin",
  adminEditOther: (id) =>
    id ? `/admin/cons/edit/${id}` : "/admin/cons/edit/:id",
  adminEditOwn: (id) =>
    id ? `/admin/admin/edit/${id}` : "/admin/admin/edit/:id",
  consultor: "/consultor",
  consultorEditOwn: (id) =>
    id ? `/consultor/cons/edit/${id}` : "/consultor/cons/edit/:id",
};

export default routes;
