import { preloadClassInfo } from "./class-loader.js";
import {
  registerMacros,
  chooseAndCreateClass,
  openClassMenu,
  openSpellsMenu,
  openInventoryMenu,
  openFeatsMenu,
  openSubclassMenu
} from "./macros.js";
import { CharacterSheet } from "./sheets/character-sheet.js";
import { ResetSettingsApp } from "./applications/reset-settings.js";
import { CustomActor } from "../Actor/Actor.js";

Hooks.once("init", async () => {
  console.log("CustomTTRPG | init - foundation patch");

  game.settings.register("custom-ttrpg","hpMultiplier", {
    name: "HP Multiplier", hint: "END × multiplier added to base Health",
    scope: "world", config: true, type: Number, default: 2
  });
  game.settings.register("custom-ttrpg","showWelcome", {
    name: "Show Quickstart Guide", hint: "Display guide on load",
    scope: "world", config: true, type: Boolean, default: true
  });
  game.settings.registerMenu("custom-ttrpg","resetSettings", {
    name: "Reset Settings", label: "Reset to Defaults",
    icon: "fas fa-undo", type: ResetSettingsApp, restricted: true
  });

  await preloadClassInfo();

  // Load all templates
  await loadTemplates([
    `systems/${game.system.id}/templates/actors/character-sheet.html`,
    `systems/${game.system.id}/templates/partials/attribute-row.html`,
    `systems/${game.system.id}/templates/partials/class-menu.html`,
    `systems/${game.system.id}/templates/partials/spells-menu.html`,
    `systems/${game.system.id}/templates/partials/inventory-menu.html`,
    `systems/${game.system.id}/templates/partials/class-info-window.html`,
    `systems/${game.system.id}/templates/partials/reset-settings.html`
  ]);

  // Document class override
  CONFIG.Actor.documentClass = CustomActor;
  CONFIG.Actor.sheetClasses = {
    character: [CharacterSheet],
    npc: []
  };
});

Hooks.once("ready", async () => {
  console.log("CustomTTRPG | ready - foundation patch");
  await registerMacros();

  // Actor Directory header buttons
  Hooks.on("renderActorDirectory", (_app, html) => {
    const header = html.closest(".app").find(".directory-header");
    if (!header.find(".ctt-class-btn").length) {
      const buttons = [
        {cls:"ctt-class-btn",title:"Class Menu",icon:"fas fa-users",action:openClassMenu},
        {cls:"ctt-spells-btn",title:"Spells Menu",icon:"fas fa-hat-wizard",action:openSpellsMenu},
        {cls:"ctt-inv-btn",title:"Inventory",icon:"fas fa-boxes",action:openInventoryMenu},
        {cls:"ctt-create-btn",title:"Create Actor",icon:"fas fa-user-plus",action:chooseAndCreateClass}
      ];
      for (let b of buttons) {
        const btn = $(`<button class="ctt-btn ${b.cls}" title="${b.title}"><i class="${b.icon}"></i></button>`);
        btn.on("click", () => b.action());
        header.append(btn);
      }
    }
  });

  // ─── Global hotkey fallback listener ─────────────────────────────────
  window.addEventListener("keydown", event => {
    const t = event.target;
    if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
    switch (event.key.toLowerCase()) {
      case "c": return openClassMenu();
      case "s": return openSpellsMenu();
      case "i": return openInventoryMenu();
      case "f": return openFeatsMenu();
      case "u": return openSubclassMenu();
    }
  });
  // ────────────────────────────────────────────────────────────────────────

});import { preloadClassInfo } from "./class-loader.js";
import {
  registerMacros,
  chooseAndCreateClass,
  openClassMenu,
  openSpellsMenu,
  openInventoryMenu,
  openFeatsMenu,
  openSubclassMenu
} from "./macros.js";
import { CharacterSheet } from "./sheets/character-sheet.js";
import { ResetSettingsApp } from "./applications/reset-settings.js";
import { CustomActor } from "../Actor/Actor.js";

Hooks.once("init", async () => {
  console.log("CustomTTRPG | init - foundation patch");

  game.settings.register("custom-ttrpg","hpMultiplier", {
    name: "HP Multiplier", hint: "END × multiplier added to base Health",
    scope: "world", config: true, type: Number, default: 2
  });
  game.settings.register("custom-ttrpg","showWelcome", {
    name: "Show Quickstart Guide", hint: "Display guide on load",
    scope: "world", config: true, type: Boolean, default: true
  });
  game.settings.registerMenu("custom-ttrpg","resetSettings", {
    name: "Reset Settings", label: "Reset to Defaults",
    icon: "fas fa-undo", type: ResetSettingsApp, restricted: true
  });

  await preloadClassInfo();

  // Document class override
  CONFIG.Actor.documentClass = CustomActor;
  CONFIG.Actor.sheetClasses = {
    character: [CharacterSheet],
    npc: []
  };
});

Hooks.once("ready", async () => {
  console.log("CustomTTRPG | ready - foundation patch");
  await registerMacros();

  // Actor Directory header buttons
  Hooks.on("renderActorDirectory", (_app, html) => {
    const header = html.closest(".app").find(".directory-header");
    if (!header.find(".ctt-class-btn").length) {
      const buttons = [
        {cls:"ctt-class-btn",title:"Class Menu",icon:"fas fa-users",action:openClassMenu},
        {cls:"ctt-spells-btn",title:"Spells Menu",icon:"fas fa-hat-wizard",action:openSpellsMenu},
        {cls:"ctt-inv-btn",title:"Inventory",icon:"fas fa-boxes",action:openInventoryMenu},
        {cls:"ctt-create-btn",title:"Create Actor",icon:"fas fa-user-plus",action:chooseAndCreateClass}
      ];
      for (let b of buttons) {
        const btn = $(`<button class="ctt-btn ${b.cls}" title="${b.title}"><i class="${b.icon}"></i></button>`);
        btn.on("click", () => b.action());
        header.append(btn);
      }
    }
  });

  // ─── Global hotkey fallback listener ─────────────────────────────────
  window.addEventListener("keydown", event => {
    const t = event.target;
    if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
    switch (event.key.toLowerCase()) {
      case "c": return openClassMenu();
      case "s": return openSpellsMenu();
      case "i": return openInventoryMenu();
      case "f": return openFeatsMenu();
      case "u": return openSubclassMenu();
    }
  });
  // ────────────────────────────────────────────────────────────────────────

});
