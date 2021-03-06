import { FastifySchema } from "fastify";

const inputUpdateTruck = {
  type: 'object',
  require: ['carrierId'],
  properties: {
    carrierId: { type: 'string' },
    id: { type: 'string' },
    truckType: { type: 'number' },
    loadingWeight: { type: 'number', nullable: true },
    stallHeight: { type: 'string', nullable: true },
    tipper: { type: 'boolean', nullable: true },
    registrationNumber: { type: 'array', items: { type: 'string' } },
    document: { type: 'array', items: { type: 'string' }, nullable: true },
    documentStatus: { type: 'string', nullable: true },
    truckPhotos: {
      type: 'object', properties: {
        front: {
          type: 'object', nullable: true
        },
        back: {
          type: 'object', nullable: true
        },
        left: {
          type: 'object', nullable: true
        },
        right: {
          type: 'object', nullable: true
        },

      }
    },
    workingZones: {
      type: 'array', items: {
        type: 'object', properties: {
          region: { type: 'number' },
          province: { type: 'number', nullable: true }
        }
      }
    }
  }
}

const searchSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      page: { type: 'number', nullable: true },
      rowsPerPage: { type: 'number', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'array', items: { type: 'number' }, nullable: true },
      workingZones: { type: 'array', items: { type: 'number' }, nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        totalElements: { type: 'number' },
        size: { type: 'number' },
        numberOfElements: { type: 'number' },
        currentPage: { type: 'number' },
        totalPages: { type: 'number' },
      },
    }
  }
}
export const searchGetSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      page: { type: 'number', nullable: true },
      rowsPerPage: { type: 'number', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
      searchText: { type: 'string', nullable: true }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        totalElements: { type: 'number' },
        size: { type: 'number' },
        numberOfElements: { type: 'number' },
        currentPage: { type: 'number' },
        totalPages: { type: 'number' },
      },
    }
  }
}
export const createTruck: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  body: {
    type: 'object', properties: {
      carrierId: { type: 'string' },
      truckType: { type: 'number' },
      loadingWeight: { type: 'number', nullable: true },
      stallHeight: { type: 'string', nullable: true },
      tipper: { type: 'boolean', nullable: true },
      registrationNumber: { type: 'array', items: { type: 'string' } },
      createdFrom: { type: 'number', nullable: true },
      truckPhotos: {
        type: 'object', properties: {
          front: { type: 'string', nullable: true },
          back: { type: 'string', nullable: true },
          left: { type: 'string', nullable: true },
          right: { type: 'string', nullable: true },
        }
      },
      workingZones: {
        type: 'array', items: {
          type: 'object', properties: {
            region: { type: 'number' },
            province: { type: 'number', nullable: true }
          }
        }
      },
      document: { type: 'array', items: { type: 'string' }, nullable: true },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object', properties: {
            id: { type: 'string' },
            document: {
              type: "object",
              additionalProperties: { type: "string" }, nullable: true
            },
            truckPhotos: { type: 'object', additionalProperties: { type: "string" }, nullable: true },
            documentStatus: { type: 'string', nullable: true },
            carrierId: { type: 'number', nullable: true },
            registrationNumber: { type: 'array', nullable: true },
            loadingWeight: { type: 'number', nullable: true },
            truckType: { type: 'number' },
            isTipper: { type: 'boolean' },
            stallHeight: { type: 'string' },
            approveStatus: { type: 'string' },
            workingZones: { type: 'array', nullable: true }
          }
        },
      },
    }
  }
}

export const updateTruck: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  body: inputUpdateTruck,
  params: { id: { type: 'string' } },
  response: {
    200: { type: 'boolean' }
  }
}

export const getMySchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      page: { type: 'number', nullable: true },
      rowsPerPage: { type: 'number', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        totalElements: { type: 'number' },
        size: { type: 'number' },
        numberOfElements: { type: 'number' },
        currentPage: { type: 'number' },
        totalPages: { type: 'number' },
      },
    }
  }
}
export const getListTruckByCarrierIdSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  params: { userId: { type: 'string' } },
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      page: { type: 'number', nullable: true },
      rowsPerPage: { type: 'number', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        totalElements: { type: 'number' },
        size: { type: 'number' },
        numberOfElements: { type: 'number' },
        currentPage: { type: 'number' },
        totalPages: { type: 'number' },
      },
    }
  }
}

export const getAllMeSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
      },
    }
  }
}


export const getAllMeWithoutAuthorizeSchema: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  params: { id: { type: 'string' } },
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'array' },
      },
    }
  }
}

export const getMyTruckSummary: FastifySchema = {
  headers: {
    type: 'object',
    properties: {
      authorization: { type: 'string' }
    },
    require: ['authorization']
  },
  querystring: {
    type: 'object',
    properties: {
      descending: { type: 'boolean', nullable: true },
      sortBy: { type: 'string', nullable: true },
      truckTypes: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      workingZones: { type: 'string', nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        trucks: { type: 'number' },
        zones: { type: 'number' }
      },
    }
  }
}

export default searchSchema
