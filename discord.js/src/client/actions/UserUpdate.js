'use strict';

const Action = require('./Action');
const Events = require('../../util/Events');

class UserUpdateAction extends Action {
  handle(data) {
    const client = this.client;

    const newUser = data.id === client.user.id ? client.user : client.users.cache.get(data.id);
    const oldUser = newUser._update(data);

    if (!oldUser.equals(newUser)) {
      /**
       * Emitted whenever a user's details (e.g. username) are changed.
       * Triggered by the Discord gateway events {@link Events.UserUpdate},
       * {@link Events.GuildMemberUpdate}, and {@link Events.PresenceUpdate}.
       * @event Client#userUpdate
       * @param {User} oldUser The user before the update
       * @param {User} newUser The user after the update
       */
      client.emit(Events.UserUpdate, oldUser, newUser);

      // Check for clan changes and emit specific clan update event
      const oldClan = oldUser.clan;
      const newClan = newUser.clan;
      const oldPrimaryGuild = oldUser.primaryGuild;
      const newPrimaryGuild = newUser.primaryGuild;

      const clanChanged = (
        oldClan?.identityGuildId !== newClan?.identityGuildId ||
        oldClan?.identityEnabled !== newClan?.identityEnabled ||
        oldClan?.tag !== newClan?.tag ||
        oldClan?.badge !== newClan?.badge ||
        oldPrimaryGuild?.identityGuildId !== newPrimaryGuild?.identityGuildId ||
        oldPrimaryGuild?.identityEnabled !== newPrimaryGuild?.identityEnabled ||
        oldPrimaryGuild?.tag !== newPrimaryGuild?.tag ||
        oldPrimaryGuild?.badge !== newPrimaryGuild?.badge
      );

      if (clanChanged) {
        /**
         * Emitted whenever a user's clan information is changed.
         * @event Client#userClanUpdate
         * @param {User} oldUser The user before the clan update
         * @param {User} newUser The user after the clan update
         */
        client.emit(Events.UserClanUpdate, oldUser, newUser);
      }

      return {
        old: oldUser,
        updated: newUser,
      };
    }

    return {
      old: null,
      updated: null,
    };
  }
}

module.exports = UserUpdateAction;
