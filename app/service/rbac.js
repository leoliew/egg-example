const service = require('egg').Service

class RbacService extends service {

  async newRole ({name, alias, grants}) {
    return await this.ctx.model.Role.findOne({name})
      .then(oldRole => {
        if (oldRole === null) {
          const newRole = new this.Role()
          newRole.name = name
          newRole.alias = alias
          newRole.grants = grants
          return newRole.save()
        }
        return null
      })
  }

  async newPermission ({name, alias}) {
    return await this.ctx.model.Permission.findOne({name})
      .then(oldPermission => {
        if (oldPermission === null) {
          const newPermission = new this.Permission()
          newPermission.name = name
          newPermission.alias = alias
          return newPermission.save()
        }
        return null
      })
  }

  async modifyRoleAlias (_id, alias) {
    return await this.ctx.model.Role.updateOne({_id}, {$set: {alias}})
  }

  async modifyPermissionAlias (_id, alias) {
    return await this.ctx.model.Permission.updateOne({_id}, {$set: {alias}})
  }

  async removeRole (_id) {
    return await this.ctx.model.Role.remove({_id})
  }

  async removePermission (_id) {
    return await Promise.all([
      this.ctx.model.Permission.remove({_id}),
      this.ctx.model.Role.update({}, {$pull: {grants: _id}}),
    ])
  }

  async addPermission (_id, permissionIds) {
    return await this.ctx.model.Role.updateOne({_id}, {$addToSet: {grants: {$each: permissionIds}}})
  }

  async removePermissions (_id, permissionIds) {
    return await this.ctx.model.Role.updateOne({_id}, {$pull: {grants: {$in: permissionIds}}})
  }

  async insertManyPermission (permissions) {
    return await this.ctx.model.Permission.insertMany(permissions)
      .then(result => {
        return result.insertedIds
      })
  }

  async getRole (name) {
    return await this.ctx.model.Role.findOne({name}).populate('grants')
  }

  async getAllRoles () {
    return await this.ctx.model.Role.find({})
  }

  async getPermissions (names) {
    debug('getPermissions names = %O', names)
    return await this.ctx.model.Permission.find({name: {$in: names}})
  }

  async getAllPermissions () {
    return await this.ctx.model.Permission.find({})
  }

}

module.exports = RbacService