import { showClassInfo } from "../macros.js";

export class CharacterSheet extends foundry.applications.api.ActorSheetV2 {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["custom-ttrpg","sheet","actor"],
      template: `systems/${game.system.id}/templates/actors/character-sheet.html`,
      width: 600, 
      height: 400
    });
  }

  getData() {
    const context = super.getData();
    
    // Fix data access for templates
    context.class = context.actor.system.class;
    context.attributes = context.actor.system.attributes;
    context.settings = game.settings.get("custom-ttrpg","hpMultiplier");
    
    return context;
  }

  activateListeners(html){
    super.activateListeners(html);
    html.find("#ctt-btn-info").click(() => showClassInfo(this.actor.id));
  }

  async _onDrop(event){
    // Handle item drops in future
    return super._onDrop(event);
  }
}