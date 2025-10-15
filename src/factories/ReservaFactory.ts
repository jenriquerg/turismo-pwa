// ============================================
// PATRÓN FACTORY - Reservas
// ============================================
// Centraliza la creación de reservas con validaciones
// y cálculos automáticos

import type {
  Reserva,
  CrearReservaDTO,
} from '@/types';

import {
  TipoServicio,
  ReservaEstado,
} from '@/types';

export class ReservaFactory {
  /**
   * Crea una reserva de alojamiento
   * Calcula automáticamente el número de noches y precio total
   */
  static createReservaAlojamiento(params: {
    servicioId: string;
    userId: string;
    fechaInicio: string;
    fechaFin: string;
    cantidadPersonas: number;
    precioNoche: number;
    notas?: string;
  }): Omit<CrearReservaDTO, 'precio_total'> & { precio_total: number } {
    // Calcular número de noches
    const inicio = new Date(params.fechaInicio);
    const fin = new Date(params.fechaFin);
    const noches = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));

    if (noches <= 0) {
      throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    // Calcular precio total
    const precioTotal = noches * params.precioNoche;

    return {
      tipo_servicio: TipoServicio.ALOJAMIENTO,
      servicio_id: params.servicioId,
      user_id: params.userId,
      fecha_inicio: params.fechaInicio,
      fecha_fin: params.fechaFin,
      cantidad_personas: params.cantidadPersonas,
      precio_total: precioTotal,
      notas: params.notas,
    };
  }

  /**
   * Crea una reserva de alimento
   * Calcula el precio total basado en cantidad
   */
  static createReservaAlimento(params: {
    servicioId: string;
    userId: string;
    fechaRecogida: string;
    cantidad: number;
    precioUnitario: number;
    notas?: string;
  }): Omit<CrearReservaDTO, 'precio_total'> & { precio_total: number } {
    if (params.cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    // Calcular precio total
    const precioTotal = params.cantidad * params.precioUnitario;

    return {
      tipo_servicio: TipoServicio.ALIMENTO,
      servicio_id: params.servicioId,
      user_id: params.userId,
      fecha_inicio: params.fechaRecogida,
      cantidad_personas: params.cantidad,
      precio_total: precioTotal,
      notas: params.notas,
    };
  }

  /**
   * Crea una reserva de experiencia
   * Calcula el precio total basado en número de participantes
   */
  static createReservaExperiencia(params: {
    servicioId: string;
    userId: string;
    fechaExperiencia: string;
    cantidadParticipantes: number;
    precioPorPersona: number;
    notas?: string;
  }): Omit<CrearReservaDTO, 'precio_total'> & { precio_total: number } {
    if (params.cantidadParticipantes <= 0) {
      throw new Error('La cantidad de participantes debe ser mayor a 0');
    }

    // Calcular precio total
    const precioTotal = params.cantidadParticipantes * params.precioPorPersona;

    return {
      tipo_servicio: TipoServicio.EXPERIENCIA,
      servicio_id: params.servicioId,
      user_id: params.userId,
      fecha_inicio: params.fechaExperiencia,
      cantidad_personas: params.cantidadParticipantes,
      precio_total: precioTotal,
      notas: params.notas,
    };
  }

  /**
   * Valida que una reserva sea válida antes de crearla
   */
  static validateReserva(reserva: Partial<Reserva>): boolean {
    if (!reserva.servicio_id || !reserva.user_id) {
      throw new Error('Faltan campos obligatorios: servicio_id y user_id');
    }

    if (!reserva.fecha_inicio) {
      throw new Error('La fecha de inicio es obligatoria');
    }

    if (reserva.cantidad_personas && reserva.cantidad_personas <= 0) {
      throw new Error('La cantidad de personas debe ser mayor a 0');
    }

    if (reserva.precio_total && reserva.precio_total <= 0) {
      throw new Error('El precio total debe ser mayor a 0');
    }

    return true;
  }

  /**
   * Crea una reserva genérica con estado inicial
   */
  static create(reservaData: CrearReservaDTO): CrearReservaDTO & { estado: ReservaEstado } {
    this.validateReserva(reservaData);

    return {
      ...reservaData,
      estado: ReservaEstado.PENDIENTE,
    };
  }
}
