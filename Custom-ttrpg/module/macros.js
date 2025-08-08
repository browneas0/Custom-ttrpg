/**
 * Macro registration and utilities
 */
export async function registerMacros() {
  const defs = [
    {name:"Create Character",type:"script",command:"chooseAndCreateClass();",img:"icons/svg/hands.svg"},
    {name:"Class Info",type:"script",command:"showClassInfo();",img:"icons/svg/book.svg"}
  ];
  for (let def of defs) {
    if (!game.macros.getName(def.name)) {
      await game.macros.create(def,{displaySheet:false});
    }
  }
}

export async function chooseAndCreateClass() {
  const classes = Object.keys(CONFIG.CustomTTRPG.ClassInfo || {});
  if (!classes.length) return ui.notifications.warn("No classes defined.");
  // existing dialog logic...
}

export function openClassMenu(){ return chooseAndCreateClass(); }
export function openSpellsMenu(){ /* existing... */ }
export function openInventoryMenu(){ /* existing... */ }
export async function showClassInfo(actorId,{cls}={}){ /* existing... */ }
/**
 * Placeholder Feats Menu
 */
export function openFeatsMenu() {
  new Dialog({
    title: "Feats (Coming Soon)",
    content: `<p>Your Feats menu will go here.</p>`,
    buttons: { close: { label: "Close" } }
  }).render(true);
}

/**
 * Placeholder Subclasses Menu
 */
export function openSubclassMenu() {
  new Dialog({
    title: "Subclasses (Coming Soon)",
    content: `<p>Your Subclasses menu will go here.</p>`,
    buttons: { close: { label: "Close" } }
  }).render(true);
}
