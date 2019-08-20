﻿using UnityEngine;

#if UNITY_WEBGL && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace DCL.Interface
{
    /**
     * This class contains the outgoing interface of Decentraland.
     * You must call those functions to interact with the WebInterface.
     *
     * The messages comming from the WebInterface instead, are reported directly to
     * the handler GameObject by name.
     */
    public static class WebInterface
    {
        public static bool VERBOSE = false;
        public static System.Action<string, string> OnMessageFromEngine;

        [System.Serializable]
        private class ReportPositionPayload
        {
            /** Camera position, world space */
            public Vector3 position;

            /** Camera rotation */
            public Quaternion rotation;

            /** Camera height, relative to the feet of the avatar or ground */
            public float playerHeight;

            public Vector3 mousePosition;

            public string id;
        }


        [System.Serializable]
        public abstract class ControlEvent
        {
            public string eventType;
        }

        public abstract class ControlEvent<T> : ControlEvent
        {

            public T payload;
            protected ControlEvent(string eventType, T payload)
            {
                this.eventType = eventType;
                this.payload = payload;
            }
        }

        [System.Serializable]
        public class SceneReady : ControlEvent<SceneReady.Payload>
        {
            [System.Serializable]
            public class Payload
            {
                public string sceneId;
            }

            public SceneReady(string sceneId) : base("SceneReady", new Payload() { sceneId = sceneId }){}
        }

        [System.Serializable]
        public class ActivateRenderingACK : ControlEvent<object>
        {
            public ActivateRenderingACK() : base("ActivateRenderingACK", null){}
        }

        [System.Serializable]
        public class SceneEvent<T>
        {
            public string sceneId;
            public string eventType;
            public T payload;
        }

        [System.Serializable]
        public class UUIDEvent<TPayload>
            where TPayload : class, new()
        {
            public string uuid;
            public TPayload payload = new TPayload();
        }

        public enum POINTER
        {
            PRIMARY,
            SECONDARY,
        }

        [System.Serializable]
        public class OnClickEvent : UUIDEvent<OnClickEventPayload>
        {
        };

        [System.Serializable]
        public class OnPointerDownEvent : UUIDEvent<OnPointerEventPayload>
        {
        };


        [System.Serializable]
        public class OnPointerUpEvent : UUIDEvent<OnPointerEventPayload>
        {
        };

        [System.Serializable]
        private class OnTextSubmitEvent : UUIDEvent<OnTextSubmitEventPayload>
        {
        };

        [System.Serializable]
        private class OnChangeEvent : UUIDEvent<OnChangeEventPayload>
        {
        };

        [System.Serializable]
        private class OnFocusEvent : UUIDEvent<EmptyPayload>
        {
        };

        [System.Serializable]
        private class OnBlurEvent : UUIDEvent<EmptyPayload>
        {
        };

        [System.Serializable]
        public class OnEnterEvent : UUIDEvent<OnEnterEventPayload>
        {
        };

        [System.Serializable]
        public class OnClickEventPayload
        {
        }


        [System.Serializable]
        public class OnPointerEventPayload
        {
            [System.Serializable]
            public class Hit
            {
                public Vector3 origin;
                public float length;
                public Vector3 hitPoint;
                public Vector3 normal;
                public Vector3 worldNormal;
                public string meshName;
                public string entityId;
            }

            public POINTER pointerId;
            public Vector3 origin;
            public Vector3 direction;
            public Hit hit;
        }

        [System.Serializable]
        public class OnTextSubmitEventPayload
        {
            public string id;
            public string text;
        }

        [System.Serializable]
        public class OnChangeEventPayload
        {
            public object value;
            public int pointerId;
        }

        [System.Serializable]
        public class EmptyPayload
        {
        }

        [System.Serializable]
        public class MetricsModel
        {
            public int meshes;
            public int bodies;
            public int materials;
            public int textures;
            public int triangles;
            public int entities;
        }

        [System.Serializable]
        private class OnMetricsUpdate
        {
            public MetricsModel current = new MetricsModel();
            public MetricsModel limit = new MetricsModel();
        }

        [System.Serializable]
        public class OnEnterEventPayload
        {
        }

        [System.Serializable]
        public class OnGizmoEvent : UUIDEvent<OnGizmoEventPayload>
        {
        };

        [System.Serializable]
        public class TransformPayload
        {
            public Vector3 position = Vector3.zero;
            public Quaternion rotation = Quaternion.identity;
            public Vector3 scale = Vector3.one;
        }

        [System.Serializable]
        public class OnGizmoEventPayload
        {
            public string type;
            public string gizmoType;
            public string entityId;
            public string transform;
        }

        [System.Serializable]
        public class OnGetLoadingEntity
        {
            public string id;
            public object value;
        };

        public class OnSendScreenshot
        {
            public string id;
            public string encodedTexture;
        };

#if UNITY_WEBGL && !UNITY_EDITOR
    /**
     * This method is called after the first render. It marks the loading of the
     * rest of the JS client.
     */
    [DllImport("__Internal")] public static extern void StartDecentraland();
    [DllImport("__Internal")] public static extern void MessageFromEngine(string type, string message);
#else
        public static void StartDecentraland() =>
            Debug.Log("StartDecentraland called");

        public static void MessageFromEngine(string type, string message)
        {
            if (OnMessageFromEngine != null)
            {
                OnMessageFromEngine.Invoke(type, message);
            }

            if (VERBOSE)
            {
                Debug.Log("MessageFromEngine called with: " + type + ", " + message);
            }
        }
#endif

        public static void SendMessage<T>(string type, T message)
        {
            string messageJson = JsonUtility.ToJson(message);

            if (VERBOSE)
            {
                Debug.Log($"Sending message: " + messageJson);
            }

            MessageFromEngine(type, messageJson);
        }

        private static ReportPositionPayload positionPayload = new ReportPositionPayload();
        private static OnMetricsUpdate onMetricsUpdate = new OnMetricsUpdate();
        private static OnClickEvent onClickEvent = new OnClickEvent();
        private static OnPointerDownEvent onPointerDownEvent = new OnPointerDownEvent();
        private static OnPointerUpEvent onPointerUpEvent = new OnPointerUpEvent();
        private static OnTextSubmitEvent onTextSubmitEvent = new OnTextSubmitEvent();
        private static OnChangeEvent onChangeEvent = new OnChangeEvent();
        private static OnFocusEvent onFocusEvent = new OnFocusEvent();
        private static OnBlurEvent onBlurEvent = new OnBlurEvent();
        private static OnEnterEvent onEnterEvent = new OnEnterEvent();
        private static OnGizmoEvent onGizmoEvent = new OnGizmoEvent();
        private static OnGetLoadingEntity onGetLoadingEntity = new OnGetLoadingEntity();
        private static OnSendScreenshot onSendScreenshot = new OnSendScreenshot();

        public static void SendSceneEvent<T>(string sceneId, string eventType, T payload)
        {
            SceneEvent<T> sceneEvent = new SceneEvent<T>();
            sceneEvent.sceneId = sceneId;
            sceneEvent.eventType = eventType;
            sceneEvent.payload = payload;

            SendMessage("SceneEvent", sceneEvent);
        }

        public static void ReportPosition(Vector3 position, Quaternion rotation, float playerHeight)
        {
            positionPayload.position = position;
            positionPayload.rotation = rotation;
            positionPayload.playerHeight = playerHeight;

            SendMessage("ReportPosition", positionPayload);
        }

        public static void ReportControlEvent<T>(T controlEvent) where T : ControlEvent
        {
            SendMessage("ControlEvent", controlEvent);
        }

        public static void ReportOnClickEvent(string sceneId, string uuid)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onClickEvent.uuid = uuid;

            SendSceneEvent(sceneId, "uuidEvent", onClickEvent);
        }

        private static OnPointerEventPayload.Hit CreateHitObject(string entityId, string meshName, RaycastHit hitInfo)
        {
            OnPointerEventPayload.Hit hit = new OnPointerEventPayload.Hit();

            hit.hitPoint = hitInfo.point;
            hit.length = hitInfo.distance;
            hit.normal = hitInfo.normal;
            hit.worldNormal = hitInfo.normal;
            hit.meshName = meshName;
            hit.entityId = entityId;

            return hit;
        }

        private static OnPointerEventPayload CreatePointerEventPayload(string entityId, string meshName, Ray ray, RaycastHit hitInfo, bool isHitInfoValid)
        {
            OnPointerEventPayload payload = new OnPointerEventPayload();

            payload.origin = ray.origin;
            payload.direction = ray.direction;
            payload.pointerId = POINTER.PRIMARY;

            if (isHitInfoValid)
                payload.hit = CreateHitObject(entityId, meshName, hitInfo);
            else
                payload.hit = null;

            return payload;
        }

        public static void ReportOnPointerDownEvent(string sceneId, string uuid, string entityId, string meshName, Ray ray, RaycastHit hit)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onPointerDownEvent.uuid = uuid;
            onPointerDownEvent.payload = CreatePointerEventPayload(entityId, meshName, ray, hit, isHitInfoValid: true);

            SendSceneEvent(sceneId, "uuidEvent", onPointerDownEvent);
        }

        public static void ReportOnPointerUpEvent(string sceneId, string uuid, string entityId, string meshName, Ray ray, RaycastHit hit, bool isHitInfoValid)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onPointerUpEvent.uuid = uuid;
            onPointerUpEvent.payload = CreatePointerEventPayload(entityId, meshName, ray, hit, isHitInfoValid);

            SendSceneEvent(sceneId, "uuidEvent", onPointerUpEvent);
        }

        public static void ReportOnTextSubmitEvent(string sceneId, string uuid, string text)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onTextSubmitEvent.uuid = uuid;
            onTextSubmitEvent.payload.text = text;

            SendSceneEvent(sceneId, "uuidEvent", onTextSubmitEvent);
        }

        public static void ReportOnFocusEvent(string sceneId, string uuid)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onFocusEvent.uuid = uuid;
            SendSceneEvent(sceneId, "uuidEvent", onFocusEvent);
        }

        public static void ReportOnBlurEvent(string sceneId, string uuid)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onBlurEvent.uuid = uuid;
            SendSceneEvent(sceneId, "uuidEvent", onBlurEvent);
        }

        public static void ReportOnChangedEvent(string sceneId, string uuid, string text, int pointerId)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onChangeEvent.uuid = uuid;
            onChangeEvent.payload.value = text;
            onChangeEvent.payload.pointerId = pointerId;

            SendSceneEvent(sceneId, "uuidEvent", onChangeEvent);
        }

        public static void ReportOnScrollChange(string sceneId, string uuid, Vector2 value, int pointerId)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onChangeEvent.uuid = uuid;
            onChangeEvent.payload.value = value;
            onChangeEvent.payload.pointerId = pointerId;

            SendSceneEvent(sceneId, "uuidEvent", onChangeEvent);
        }

        public static void ReportEvent<T>(string sceneId, T @event)
        {
            SendSceneEvent(sceneId, "uuidEvent", @event);
        }


        public static void ReportOnMetricsUpdate(string sceneId, MetricsModel current,
            MetricsModel limit)
        {
            onMetricsUpdate.current = current;
            onMetricsUpdate.limit = limit;

            SendSceneEvent(sceneId, "metricsUpdate", onMetricsUpdate);
        }

        public static void ReportOnEnterEvent(string sceneId, string uuid)
        {
            if (string.IsNullOrEmpty(uuid))
                return;

            onEnterEvent.uuid = uuid;

            SendSceneEvent(sceneId, "uuidEvent", onEnterEvent);
        }

        public static void LogOut()
        {
            SendMessage("logOut", string.Empty);
        }

        public static void PreloadFinished(string sceneId)
        {
            SendMessage("PreloadFinished", sceneId);
        }


        public static void ReportGizmoEvent(string sceneId, string uuid, string type, string gizmoType, Transform entityTransform = null)
        {
            if (string.IsNullOrEmpty(uuid))
            {
                return;
            }

            onGizmoEvent.uuid = uuid;
            onGizmoEvent.payload.type = type;
            onGizmoEvent.payload.gizmoType = gizmoType;
            onGizmoEvent.payload.entityId = uuid;
            if (entityTransform != null)
            {
                TransformPayload payload = new TransformPayload();
                payload.position = entityTransform.position;
                payload.rotation = entityTransform.rotation;
                payload.scale = entityTransform.localScale;
                onGizmoEvent.payload.transform = JsonUtility.ToJson(payload);
            }

            SendSceneEvent(sceneId, "uuidEvent", onGizmoEvent);
        }

        public static void ReportMousePosition(Vector3 mousePosition, string id)
        {
            positionPayload.mousePosition = mousePosition;
            positionPayload.id = id;
            SendMessage("ReportMousePosition", positionPayload);
        }

        public static void SetLoadingEntity(object loadingEntity, string id)
        {
            onGetLoadingEntity.id = id;
            onGetLoadingEntity.value = loadingEntity;
            SendMessage("SetLoadingEntity", onGetLoadingEntity);
        }

        public static void SendScreenshot(string encodedTexture, string id)
        {
            onSendScreenshot.encodedTexture = encodedTexture;
            onSendScreenshot.id = id;
            SendMessage("SendScreenshot", onSendScreenshot);
        }
    }
}