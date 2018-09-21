package com.khartec.waltz.model.roadmap;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.khartec.waltz.model.*;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutableScenario.class)
@JsonDeserialize(as = ImmutableScenario.class)
public abstract class Scenario implements
        IdProvider,
        NameProvider,
        DescriptionProvider,
        LastUpdatedProvider {

    public abstract long roadmapId();
    public abstract ReleaseLifecycleStatus status();

}
