import { defineAbility } from "@casl/ability";

const ability = (user) =>
   defineAbility((can) => {
      can("read", "user_management");
      can("read", "permission_management");
   });

export default ability;
