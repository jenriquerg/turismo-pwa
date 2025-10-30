DO $$
DECLARE
    -- Usuarios de prueba
    user_ids UUID[] := ARRAY[
        'd33b609b-c6f3-422e-a16e-49309e4ec313',
        'b5005022-e797-49bf-b26b-0a324d07daba',
        'a9ea7321-42f6-4877-b277-38650a165f9e'
    ];

    -- Contadores y variables
    i INT;
    alojamiento_id UUID;
    alimento_id UUID;
    experiencia_id UUID;
    reserva_id UUID;
    resena_id UUID;

    -- Variables temporales para valores aleatorios
    ubicacion TEXT;
    tipo_exp TEXT;
    estado_reserva TEXT;
    tipo_servicio TEXT;

BEGIN
    -- =================================
    -- ALOJAMIENTOS
    -- =================================
    FOR i IN 1..10 LOOP
        ubicacion := CASE floor(random()*3)::int
                        WHEN 0 THEN 'Ciudad A'
                        WHEN 1 THEN 'Ciudad B'
                        ELSE 'Ciudad C'
                     END;

        INSERT INTO public.alojamientos(titulo, descripcion, precio_noche, ubicacion, capacidad, imagenes, user_id)
        VALUES (
            'Alojamiento ' || i,
            'Descripción del alojamiento ' || i,
            round((50 + random()*450)::numeric, 2),
            ubicacion,
            (2 + floor(random()*6))::int,
            ARRAY['img1.jpg','img2.jpg'],
            user_ids[(1 + floor(random()*3))::int]
        )
        RETURNING id INTO alojamiento_id;
    END LOOP;

    -- =================================
    -- ALIMENTOS
    -- =================================
    FOR i IN 1..10 LOOP
        INSERT INTO public.alimentos(nombre, descripcion, precio, disponibilidad, horario_recogida, imagenes, user_id)
        VALUES (
            'Alimento ' || i,
            'Descripción del alimento ' || i,
            round((5 + random()*45)::numeric, 2),
            true,
            '08:00-20:00',
            ARRAY['food1.jpg','food2.jpg'],
            user_ids[(1 + floor(random()*3))::int]
        )
        RETURNING id INTO alimento_id;
    END LOOP;

    -- =================================
    -- EXPERIENCIAS
    -- =================================
    FOR i IN 1..10 LOOP
        tipo_exp := CASE floor(random()*5)::int
                        WHEN 0 THEN 'senderismo'
                        WHEN 1 THEN 'ciclismo'
                        WHEN 2 THEN 'cultural'
                        WHEN 3 THEN 'gastronomica'
                        ELSE 'aventura'
                    END;

        ubicacion := CASE floor(random()*3)::int
                        WHEN 0 THEN 'Lugar A'
                        WHEN 1 THEN 'Lugar B'
                        ELSE 'Lugar C'
                     END;

        INSERT INTO public.experiencias(titulo, descripcion, precio, tipo, duracion_horas, capacidad_maxima, ubicacion, imagenes, user_id)
        VALUES (
            'Experiencia ' || i,
            'Descripción de la experiencia ' || i,
            round((20 + random()*180)::numeric,2),
            tipo_exp,
            round((1 + random()*5)::numeric, 2),
            (5 + floor(random()*15))::int,
            ubicacion,
            ARRAY['exp1.jpg','exp2.jpg'],
            user_ids[(1 + floor(random()*3))::int]
        )
        RETURNING id INTO experiencia_id;
    END LOOP;

    -- =================================
    -- RESERVAS
    -- =================================
    FOR i IN 1..15 LOOP
        tipo_servicio := CASE floor(random()*3)::int
                            WHEN 0 THEN 'alojamiento'
                            WHEN 1 THEN 'alimento'
                            ELSE 'experiencia'
                          END;

        estado_reserva := CASE floor(random()*5)::int
                            WHEN 0 THEN 'pendiente'
                            WHEN 1 THEN 'confirmada'
                            WHEN 2 THEN 'pagada'
                            WHEN 3 THEN 'completada'
                            ELSE 'cancelada'
                          END;

        INSERT INTO public.reservas(tipo_servicio, servicio_id, user_id, fecha_inicio, fecha_fin, cantidad_personas, precio_total, estado, notas)
        VALUES (
            tipo_servicio,
            CASE tipo_servicio
                WHEN 'alojamiento' THEN (SELECT id FROM public.alojamientos OFFSET floor(random()*10) LIMIT 1)
                WHEN 'alimento' THEN (SELECT id FROM public.alimentos OFFSET floor(random()*10) LIMIT 1)
                ELSE (SELECT id FROM public.experiencias OFFSET floor(random()*10) LIMIT 1)
            END,
            user_ids[(1 + floor(random()*3))::int],
            now() + (floor(random()*10)||' days')::interval,
            now() + (floor(random()*10 + 1)||' days')::interval,
            (1 + floor(random()*5))::int,
            round((10 + random()*500)::numeric, 2),
            estado_reserva,
            'Notas de la reserva ' || i
        )
        RETURNING id INTO reserva_id;
    END LOOP;

    -- =================================
    -- RESEÑAS
    -- =================================
    FOR i IN 1..20 LOOP
        tipo_servicio := CASE floor(random()*3)::int
                            WHEN 0 THEN 'alojamiento'
                            WHEN 1 THEN 'alimento'
                            ELSE 'experiencia'
                          END;

        INSERT INTO public.resenas(servicio_id, tipo_servicio, user_id, calificacion, comentario)
        VALUES (
            CASE tipo_servicio
                WHEN 'alojamiento' THEN (SELECT id FROM public.alojamientos OFFSET floor(random()*10) LIMIT 1)
                WHEN 'alimento' THEN (SELECT id FROM public.alimentos OFFSET floor(random()*10) LIMIT 1)
                ELSE (SELECT id FROM public.experiencias OFFSET floor(random()*10) LIMIT 1)
            END,
            tipo_servicio,
            user_ids[(1 + floor(random()*3))::int],
            (1 + floor(random()*5))::int,
            'Comentario de la reseña ' || i
        )
        RETURNING id INTO resena_id;
    END LOOP;

END $$;
