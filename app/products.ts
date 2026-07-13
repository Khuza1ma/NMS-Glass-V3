import { ProductVariant, Product, SubCategory, Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "aluminum",
    name: "Aluminum",
    description: "Premium and durable aluminum structures including high-quality windows, doors, sliding systems, and partitions.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "windows",
        name: "Aluminum Windows",
        description: "Elegant, weather-resistant window systems designed for premium performance, ventilation, and style.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "openable-window",
            name: "Openable Window",
            description: "Classic openable (casement) aluminum windows featuring premium sealing, secure multi-point locking systems, and smooth operation.",
            features: [
              "High-grade weatherstripping for wind and water resistance",
              "Smooth premium friction hinges and robust handles",
              "Double glazing options for thermal and sound insulation"
            ],
            specs: {
              "Material": "Alloy 6063 T5 / T6 Premium Aluminum",
              "Glass Option": "Single / Double / Toughened Glass",
              "Hardware": "Premium Multi-Point Lock Systems"
            },
            images: [
              "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            ]
          },
          {
            id: "sliding-window",
            name: "Sliding Window",
            description: "Modern space-saving sliding windows featuring ultra-smooth rollers, dust seals, and elegant frame designs.",
            features: [
              "Heavy-duty double rollers for effortless operations",
              "Multi-track options with flymesh compatibility",
              "Interlocking profile details with weather seals"
            ],
            specs: {
              "Track Design": "2 Track, 3 Track & 4 Track options",
              "Glass Thickness": "5mm to 12mm single / DGU",
              "Roller Spec": "Premium nylon / brass ball bearing rollers"
            },
            images: [
              "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
            ]
          },
          {
            id: "45mm-window",
            name: "45mm Window Series",
            description: "Highly stable and versatile heavy-duty 45mm series window designed for tall architectural elevations and high wind load zones.",
            specs: {
              "Frame Depth": "45mm heavy profiles",
              "Finish": "Anodized, Powder Coated, or Wood grain sublimation",
              "Load Rating": "Engineered for high-rise buildings"
            },
            images: [
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
            ]
          },
          {
            id: "casement-window",
            name: "Casement Window",
            description: "Premium heavy-duty casement windows with clean aesthetics, hidden hinges, and wide panoramic glass options.",
            specs: {
              "Opening Direction": "Outward / Inward options",
              "Thermal Break": "Optional advanced structural thermal break"
            },
            images: [
              "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
            ]
          }
        ]
      },
      {
        id: "doors",
        name: "Aluminum Doors",
        description: "Sturdy and sleek entryway and internal doors featuring custom configurations.",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "normal-door",
            name: "Normal Aluminum Door",
            description: "Standard aluminum entry and office doors featuring robust profiles, high durability, and custom panel combinations.",
            variants: [
              {
                name: "Standard Glass Door",
                description: "Half-glass, half-sheet design ideal for offices and retail outlets.",
                images: ["https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80"]
              },
              {
                name: "Full Sheet Flush Door",
                description: "Solid composite panel door ideal for internal rooms and washrooms.",
                images: ["https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80"]
              }
            ],
            images: ["https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: "one-series-door",
            name: "One Series Door",
            description: "Elegant ultra-slim profile doors designed for modern luxury offices and residential areas requiring maximum transparency.",
            images: ["https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: "premium-door",
            name: "Premium Door",
            description: "High-end luxury thermal-break lift-and-slide and folding doors for seamless indoor-outdoor transitions.",
            images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"]
          }
        ]
      },
      {
        id: "partitions",
        name: "Aluminum Partitions",
        description: "Office cabin partitions, shop fronts, and soundproof glass separation walls with aluminum framing.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "office-partitions",
            name: "Premium Office Partitions",
            description: "Heavy-duty modular partition grid systems supporting frosted, double glazed, or single toughened glass.",
            specs: {
              "Frame Section": "2.5 inch / 3 inch grids",
              "Glass Type": "Frosted, Clear, Acoustic laminate"
            },
            images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"]
          }
        ]
      }
    ]
  },
  {
    id: "fiber",
    name: "Fiber Products",
    description: "Premium glass fiber doors, customized kitchen cabinets, lightweight trolleys, and customized composite fabrications.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "fiber-doors",
        name: "Fiber Doors",
        description: "100% waterproof and termite-proof fiber doors for washrooms and balconies with premium wood grain textures.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "waterproof-doors",
            name: "Waterproof Fiber Doors",
            description: "Highly durable composite doors with synthetic polymer finishes that never rot, rust, or wrap under moisture exposure.",
            images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"]
          }
        ]
      },
      {
        id: "fiber-kitchen",
        name: "Fiber Kitchen & Cabinets",
        description: "Modular kitchens featuring lightweight fiber composites, moisture resistant boards, soft close trolleys, and designer storage.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "modular-trolley",
            name: "Modular Kitchen Trolleys & Accessories",
            description: "High capacity stainless steel trolleys, pull-out spice racks, corner carousels, and durable fiber drawers.",
            features: [
              "Heavy load drawer slides with soft close dampers",
              "Easy to clean fiber body panels",
              "Corrosion resistant SS304 baskets"
            ],
            images: ["https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: "fiber-cabinet-designs",
            name: "Fiber & Composite Cabinet Designs",
            description: "Beautiful modern cabinet configurations with acrylic sheet finish and weather resistant fiber frames.",
            images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"]
          }
        ]
      }
    ]
  },
  {
    id: "mosquito-net",
    name: "Mosquito Net",
    description: "High-grade insect screens, sliding screens, openable frames, and space-saving pleated systems for windows and doors.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "nets",
        name: "Insect Protection Net Systems",
        description: "Specialized mesh products keeping mosquitoes out while ensuring optimal fresh air flow.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "sliding-net",
            name: "Sliding Mosquito Net",
            description: "Durable aluminum sliding frame mosquito net matching perfectly with double track and triple track window systems.",
            specs: {
              "Mesh Material": "Fiberglass / SS304 Stainless Steel mesh",
              "Frame Material": "Powder coated heavy duty aluminum frame"
            },
            images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: "openable-net",
            name: "Openable Mosquito Net",
            description: "Hinged frame screens that can open inward or outward, featuring magnets for secure latching.",
            images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"]
          },
          {
            id: "pleated-net",
            name: "Pleated Mosquito Net",
            description: "Modern, luxury polyester accordion pleated mesh system retracting sideways when not in use. Elegant and low profile.",
            specs: {
              "Mesh style": "Pleated accordion design",
              "Track height": "Ultra low bottom tracks (only 4mm height)"
            },
            images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"]
          }
        ]
      }
    ]
  },
  {
    id: "other-services",
    name: "Other Services",
    description: "Glass glazing, custom structural fabrications, custom structural repairs, and specialized architectural services.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "glass-glazing",
        name: "Structural Glass Glazing",
        description: "Specialized framing and glazing works for premium commercial facades and glass enclosures.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        products: [
          {
            id: "facade-glazing",
            name: "Facade Glazing Works",
            description: "Spider glazing, curtain walls, and toughened canopy glasses.",
            images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"]
          }
        ]
      }
    ]
  }
];
