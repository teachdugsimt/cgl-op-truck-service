import { FastifySchema } from "fastify";
const inputCreateTruck = {
  type: 'object',
  properties: {
    carrierId: { type: 'number' },
    truckTypes: { type: 'number' },
    loadingWeight: { type: 'number', nullable: true },
    stallHeight: { type: 'string', nullable: true },
    tipper: { type: 'boolean', nullable: true },
    registrationNumber: { type: 'array' },
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
    }
  }
}

const inputUpdateTruck = {
  type: 'object',
  require: ['carrierId'],
  properties: {
    carrierId: { type: 'string' },
    truckTypes: { type: 'number' },
    loadingWeight: { type: 'number', nullable: true },
    stallHeight: { type: 'string', nullable: true },
    tipper: { type: 'boolean', nullable: true },
    registrationNumber: { type: 'array', items: { type: 'string' } },
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
  body: inputCreateTruck,
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object', properties: {
            id: { type: 'string' },
            ...inputCreateTruck.properties
          }
        },
        // data: { type: 'array' },
      },
    }
  }
}

export const updateTruck: FastifySchema = {
  body: inputUpdateTruck,
  params: { id: { type: 'string' } },
  response: {
    200: {
      type: 'object',
      properties: { data: { type: 'boolean' } }
    }
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
