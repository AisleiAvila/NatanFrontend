const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

// Middleware para processar JSON
app.use(express.json());

// Serve static files from assets directory
app.use(express.static(path.join(__dirname, "src/assets")));

// Serve the main HTML file for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/assets/index.html"));
});

// Dados mockados para categorias
let categories = [
  {
    id: 1,
    name: "Construção Civil",
    description: "Materiais e serviços para construção civil",
    isActive: true,
    isFeatured: true,
    featuredOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Acabamento",
    description: "Materiais e serviços de acabamento",
    isActive: true,
    isFeatured: true,
    featuredOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Ferramentas",
    description: "Ferramentas e equipamentos",
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Hidráulica",
    description: "Materiais e serviços hidráulicos",
    isActive: true,
    isFeatured: true,
    featuredOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Elétrica",
    description: "Materiais e serviços elétricos",
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Dados mockados para subcategorias
let subcategories = [
  {
    id: 1,
    name: "Alvenaria",
    description: "Materiais para alvenaria",
    isActive: true,
    categoryId: 1,
    category: categories[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Pintura",
    description: "Materiais e serviços de pintura",
    isActive: true,
    categoryId: 2,
    category: categories[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Ferramentas Manuais",
    description: "Ferramentas manuais para construção",
    isActive: true,
    categoryId: 3,
    category: categories[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Tubos e Conexões",
    description: "Tubos e conexões hidráulicas",
    isActive: true,
    categoryId: 4,
    category: categories[3],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Fios e Cabos",
    description: "Fios e cabos elétricos",
    isActive: true,
    categoryId: 5,
    category: categories[4],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Dados mockados para regiões
let regions = [
  {
    id: "1",
    name: "São Paulo",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Rio de Janeiro",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Minas Gerais",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Dados mockados para projetos
let projects = [
  {
    id: "1",
    title: "Construção de Prédio Residencial",
    description: "Projeto de construção de prédio com 20 andares",
    category: {
      id: "1",
      name: "Construção Civil",
    },
    subcategory: {
      id: "1",
      name: "Prédios",
    },
    client: {
      id: "1",
      name: "João Silva",
    },
    provider: {
      id: "1",
      name: "Construtora XYZ",
    },
    region: {
      id: "1",
      name: "São Paulo",
    },
    budget: 2000000,
    status: "busy",
    startDate: new Date("2024-01-01"),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Reforma de Casa",
    description: "Reforma completa de casa com 200m²",
    category: {
      id: "2",
      name: "Reforma",
    },
    subcategory: {
      id: "2",
      name: "Residencial",
    },
    client: {
      id: "2",
      name: "Maria Santos",
    },
    provider: {
      id: "2",
      name: "Reformas Express",
    },
    region: {
      id: "2",
      name: "Rio de Janeiro",
    },
    budget: 150000,
    status: "available",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-04-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Endpoints de categorias
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  res.json(category);
});

app.post("/api/categories", (req, res) => {
  const newCategory = {
    id: categories.length + 1,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put("/api/categories/:id", (req, res) => {
  const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  categories[index] = {
    ...categories[index],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(categories[index]);
});

app.delete("/api/categories/:id", (req, res) => {
  const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  categories.splice(index, 1);
  res.status(204).send();
});

app.patch("/api/categories/:id/status", (req, res) => {
  const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  categories[index] = {
    ...categories[index],
    isActive: req.body.isActive,
    updatedAt: new Date(),
  };
  res.json(categories[index]);
});

app.patch("/api/categories/:id/featured", (req, res) => {
  const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  categories[index] = {
    ...categories[index],
    isFeatured: req.body.isFeatured,
    featuredOrder: req.body.featuredOrder,
    updatedAt: new Date(),
  };
  res.json(categories[index]);
});

// Endpoints de subcategorias
app.get("/api/subcategories", (req, res) => {
  res.json(subcategories);
});

app.get("/api/subcategories/:id", (req, res) => {
  const subcategory = subcategories.find(
    (s) => s.id === parseInt(req.params.id)
  );
  if (!subcategory) {
    return res.status(404).json({ message: "Subcategoria não encontrada" });
  }
  res.json(subcategory);
});

app.post("/api/subcategories", (req, res) => {
  const newSubcategory = {
    id: subcategories.length + 1,
    ...req.body,
    category: categories.find((c) => c.id === req.body.categoryId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  subcategories.push(newSubcategory);
  res.status(201).json(newSubcategory);
});

app.put("/api/subcategories/:id", (req, res) => {
  const index = subcategories.findIndex(
    (s) => s.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: "Subcategoria não encontrada" });
  }
  subcategories[index] = {
    ...subcategories[index],
    ...req.body,
    category: categories.find((c) => c.id === req.body.categoryId),
    updatedAt: new Date(),
  };
  res.json(subcategories[index]);
});

app.delete("/api/subcategories/:id", (req, res) => {
  const index = subcategories.findIndex(
    (s) => s.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: "Subcategoria não encontrada" });
  }
  subcategories.splice(index, 1);
  res.status(204).send();
});

app.patch("/api/subcategories/:id/status", (req, res) => {
  const index = subcategories.findIndex(
    (s) => s.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: "Subcategoria não encontrada" });
  }
  subcategories[index] = {
    ...subcategories[index],
    isActive: req.body.isActive,
    updatedAt: new Date(),
  };
  res.json(subcategories[index]);
});

// Endpoints de regiões
app.get("/api/regions", (req, res) => {
  res.json(regions);
});

app.get("/api/regions/:id", (req, res) => {
  const region = regions.find((r) => r.id === req.params.id);
  if (!region) {
    return res.status(404).json({ message: "Região não encontrada" });
  }
  res.json(region);
});

app.post("/api/regions", (req, res) => {
  const newRegion = {
    id: String(regions.length + 1),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  regions.push(newRegion);
  res.status(201).json(newRegion);
});

app.put("/api/regions/:id", (req, res) => {
  const index = regions.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Região não encontrada" });
  }
  regions[index] = {
    ...regions[index],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(regions[index]);
});

app.delete("/api/regions/:id", (req, res) => {
  const index = regions.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Região não encontrada" });
  }
  regions.splice(index, 1);
  res.status(204).send();
});

// Endpoints de projetos
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }
  res.json(project);
});

app.post("/api/projects", (req, res) => {
  const newProject = {
    id: String(projects.length + 1),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put("/api/projects/:id", (req, res) => {
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }
  projects[index] = {
    ...projects[index],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(projects[index]);
});

app.delete("/api/projects/:id", (req, res) => {
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }
  projects.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Natan Construtora server running on http://0.0.0.0:${PORT}`);
});
