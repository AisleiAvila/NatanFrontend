{
  path: "categories",
  loadChildren: () =>
    import("../admin/categories/categories.module").then((m) => m.CategoriesModule),
  canActivate: [AdminGuard]
}, 